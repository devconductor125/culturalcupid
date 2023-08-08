import { Request, Response } from 'express';
import prisma from '../db';
import { hashPassword, comparePasswords, createJWT } from '../modules/auth';
import { chargeStripe } from '../utils/stripe';
import { sendEmail } from '../utils/smtp';
import { getPaymentsInfo } from '../utils/credentials';
import paypal from '@paypal/checkout-server-sdk';
import { createTransaction } from './transactions';

const redirectURL =
  process.env.NODE_ENV === 'production'
    ? 'https://corner-stone-two.vercel.app'
    : 'http://localhost:5173';

const Stripe = require('stripe');
let stripe;

const initializeStripe = async () => {
  try {
    const paymentsInfo = await getPaymentsInfo();
    stripe = Stripe(
      paymentsInfo?.stripeKey ||
        'sk_test_51NCAJ6EqYI7ImjKtykijt5pbZzqql4oSJAG4uJBwHKbrBcIVupI3AQ3BgofBm7a3zW2QuhWJgOsuOJ5p7OlwbSwz00N4Ze1s5g'
    );
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
};

initializeStripe();

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
        source: 'local',
        address: req.body.address,
        name: req.body.name,
        telephone: req.body.telephone,
        isAdmin: req.body.isJuniorAdmin ? true : false,
        adminType: req.body.isJuniorAdmin ? 'JUNIOR' : null,
        status: 'ACTIVE',
        ip: req.body.ip,
        memberType: req.body.memberType,
      },
    });

    await sendEmail(
      user.email,
      'Welcome to Corner stone',
      `Hey ${user.name}, welcome to Corner Store!`
    );
    const token = createJWT(user);
    res.json({
      token,
      id: user.id,
      isAdmin: user.isAdmin,
      adminType: user.adminType,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const subscribePlan = async (req, res, next) => {
  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id: req.body.planId,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const balance = user.wallet - plan.price;

    if (balance < 0) {
      throw new Error('No enough balance');
    }

    const subscribe = await prisma.user.update({
      data: {
        planId: req.body.planId,
        wallet: balance,
      },
      where: {
        id: req.user.id,
      },
    });
    await createTransaction(
      req.user.id,
      plan.price,
      'SUBSCRIPTION',
      `Subscribed to plan ${req.body.planId}`
    );
    res.send({ data: subscribe });
  } catch (error) {
    next(error);
  }
};

export const cancelPlan = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user.planId) {
      throw new Error('No plan to cancel');
    }

    const cancelledPlan = await prisma.user.update({
      data: {
        planId: null,
      },
      where: {
        id: req.user.id,
      },
    });
    res.send({ data: cancelledPlan });
  } catch (error) {
    next(error);
  }
};

export const upgradePlan = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const plans = await prisma.plan.findMany({
      orderBy: {
        price: 'asc',
      },
    });

    const currentPlanIndex = plans.findIndex((plan) => plan.id === user.planId);

    if (currentPlanIndex === -1 || currentPlanIndex === plans.length - 1) {
      throw new Error('No upgrade available');
    }

    const nextPlan = plans[currentPlanIndex + 1];

    if (user.wallet < nextPlan.price) {
      throw new Error('Not enough balance to upgrade');
    }

    const newBalance = user.wallet - nextPlan.price;

    const upgradedPlan = await prisma.user.update({
      data: {
        planId: nextPlan.id,
        wallet: newBalance,
      },
      where: {
        id: req.user.id,
      },
    });

    await createTransaction(
      req.user.id,
      nextPlan.price,
      'UPGRADE',
      `UPGRADED PLAN`
    );
    res.send({ data: upgradedPlan });
  } catch (error) {
    next(error);
  }
};

export const chargeWallet = async (req, res, next) => {
  try {
    const { cardId } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        Cards: true, // Include the related Card records in the User record
      },
    });

    if (!user.stripeCustomerId) {
      throw new Error('User needs to create a wallet first');
    }

    // Find the card in the user's cards
    const card = user.Cards.find((card) => card.id === cardId);

    // Check if the card exists
    if (!card) {
      throw new Error('Invalid card ID');
    }

    const charge = await chargeStripe({
      amount: req.body.amount,
      cardId: card.stripeCardId, // Use the Stripe card id stored in the card record
      customerId: user.stripeCustomerId,
    });

    if (!charge) {
      throw new Error('Error charging wallet');
    }

    const updateUser = await prisma.user.update({
      data: {
        wallet: user.wallet + req.body.amount,
      },
      where: {
        id: req.user.id,
      },
    });

    await createTransaction(
      req.user.id,
      req.body.amount,
      'CHARGE',
      'Wallet Top up using Card'
    );

    res.send({ data: updateUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const topUpWalletForPaypalSuccess = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const orderID = req.body.orderID;

    const paymentsInfo = await getPaymentsInfo();

    if (!paymentsInfo.paypalClientId || !paymentsInfo.paypalSecretKey) {
      throw new Error(
        'Missing PayPal client ID or secret key in payment information.'
      );
    }

    const environment = new paypal.core.SandboxEnvironment(
      paymentsInfo.paypalClientId,
      paymentsInfo.paypalSecretKey
    );
    const paypalClient = new paypal.core.PayPalHttpClient(environment);

    const request = new paypal.orders.OrdersGetRequest(orderID);

    const response = await paypalClient.execute(request);

    if (response.result.status !== 'COMPLETED') {
      throw new Error('Payment not successful');
    }

    const transactionAmount = parseFloat(
      response.result.purchase_units[0].amount.value
    );

    const updateUser = await prisma.user.update({
      data: {
        wallet: user.wallet + transactionAmount,
      },
      where: {
        id: req.user.id,
      },
    });

    await createTransaction(
      req.user.id,
      req.body.amount,
      'CHARGE',
      'Wallet Top up using Paypal'
    );

    res.send({ data: updateUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const AddStripeCard = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      // Create a new customer if not exist
      const customer = await stripe.customers.create({
        name: req.user.username,
        email: req.user.email,
      });
      stripeCustomerId = customer.id;
      // Update the stripeCustomerId in your database
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    // Create a new card
    const card_token = await stripe.tokens.create({
      card: {
        name: req.body.cardName,
        number: req.body.cardNo,
        exp_month: req.body.expMonth,
        exp_year: req.body.expYear,
        cvc: req.body.cvc,
      },
    });

    const stripeCard = await stripe.customers.createSource(stripeCustomerId, {
      source: card_token.id,
    });

    const card = await prisma.card.create({
      data: {
        name: req.body.cardName,
        cardNumber: req.body.cardNo,
        expiry: `${req.body.expMonth}/${req.body.expYear}`,
        cvc: '***',
        stripeCardId: stripeCard.id,
        userId: req.user.id.toString(),
      },
    });

    res.send({ data: card });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        email: true,
        username: true,
        source: true,
        wallet: true,
        id: true,
        profilePhoto: true,
        plan: true,
        isAdmin: true,
        adminType: true,
        address: true,
        telephone: true,
        name: true,
        speciality: true,
        businessEmail: true,
        showEmail: true,
        showMobile: true,
        businessPhone: true,
        website: true,
        facebook: true,
        instagram: true,
        twitter: true,
        Cards: true,
        home: true,
        webContent: true,
        storage: true,
        smtp: true,
        payments: true,
        keys: true,
        analytics: true,
        uploads: true,
        manageCategories: true,
        theme: true,
        plans: true,
        trash: true,
        ads: true,
      },
    });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const signin = async (req, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.status(404);
    res.json({ message: 'No user registered with this email!' });
    return;
  }

  if (user.status === 'SUSPENDED') {
    res.status(404);
    res.json({ message: 'You are suspended by the admin!' });
    return;
  }
  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'unauthorized user' });
    return;
  }

  const token = createJWT(user);

  res.json({
    token,
    isAdmin: user.isAdmin,
    adminType: user.adminType,
    id: user.id,
  });
};

export const googleRegister = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.user.profile.displayName,
        password: await hashPassword(req.user.accessToken),
        email: req.user.profile.email,
        source: 'google',
      },
    });
    const token = createJWT(user);
    req.app.set('user', {
      email: req.user.profile.email,
      username: req.user.profile.displayName,
      source: 'google',
      token: token,
      id: user.id,
    });
    res.redirect(redirectURL);
  } catch (error) {
    res.status(301);
    // res.send({ error: "This user is already registered" });
    res.redirect(`${redirectURL}` + '/login');
    next(error);
  }
};
export const facebookRegister = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.name,
        password: await hashPassword(req.body.accessToken),
        email: req.body.email,
        source: 'facebook',
      },
    });
    const token = createJWT(user);
    req.app.set('user', {
      email: req.user.profile.email,
      username: req.user.profile.displayName,
      source: 'facebook',
      token: token,
      id: user.id,
    });
    res.redirect(redirectURL);
  } catch (error) {
    res.status(301);
    // res.send({ error: "This user is already registered" });
    res.redirect(`${redirectURL}` + '/login');
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    if (req.params.id !== 'null') {
      console.log(req.params.id);
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};
