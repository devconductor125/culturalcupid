import prisma from "../db";
import { getPaymentsInfo } from "./credentials";

const Stripe = require("stripe");
let stripe;

const initializeStripe = async () => {
  try {
    const paymentsInfo = await getPaymentsInfo();
    stripe = Stripe(
      paymentsInfo?.stripeKey ||
        "sk_test_51NCAJ6EqYI7ImjKtykijt5pbZzqql4oSJAG4uJBwHKbrBcIVupI3AQ3BgofBm7a3zW2QuhWJgOsuOJ5p7OlwbSwz00N4Ze1s5g"
    );
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
  }
};

initializeStripe();

export const chargeStripe = async ({
  amount,
  customerId,
  cardId,
}: {
  amount: number;
  customerId: string;
  cardId: string;
}) => {
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      customer: customerId,
      source: cardId, // 'source' is the correct parameter name, not 'card'
      description:
        "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
    });
    return charge;
  } catch (error) {
    console.log(error);
  }
};

// export const createCustomer = async (req,res, next) =>{
//     try {
//         const customer = await  stripe.customers.create({
//             name: req.body.email,
//         });
//         res.send({ data: customer })
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }

// export const AddNewCard = async ({
//   customerId,
//   cardName,
//   cardNo,
//   cvc,
//   expMonth,
//   expYear,
//   userId,
// }) => {
//   try {
//     const card_token = await stripe.tokens.create({
//       card: {
//         name: cardName,
//         number: cardNo,
//         exp_month: expMonth,
//         exp_year: expYear,
//         cvc: cvc,
//       },
//     });

//     const stripeCard = await stripe.customers.createSource(customerId, {
//       source: card_token.id,
//     });

//     const card = await prisma.card.create({
//       data: {
//         name: cardName,
//         cardNumber: stripeCard.id, // Store the Stripe card id
//         expiry: `${expMonth}/${expYear}`, // Store the expiry date
//         cvc: "***", // DO NOT store the real CVC. It's against PCI Compliance
//         userId: userId,
//       },
//     });

//     return card; // return the card object
//   } catch (error) {
//     console.log(error);
//     // next(error)
//   }
// };
