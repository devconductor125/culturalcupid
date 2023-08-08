import { Router } from 'express';
import {
  cancelPlan,
  createNewUser,
  facebookRegister,
  getUserById,
  googleRegister,
  signin,
  topUpWalletForPaypalSuccess,
  updateUserInfo,
  upgradePlan,
} from '../services/user';
import passport from '../utils/passport';
import { protect } from '../modules/auth';

const router = Router();

router.post('/user', createNewUser);
router.patch('/update-user', protect, updateUserInfo);
router.post('/paypal-success', protect, topUpWalletForPaypalSuccess);
router.delete('/plan/cancel', protect, cancelPlan);
router.post('/plan/upgrade', protect, upgradePlan);
router.get('/user/:id', getUserById);
router.get('/get-ip', async (req, res, next) => {
  const clientIP = req.ip;
  res.send({ ip: clientIP });
});

router.post('/sign', signin);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);
router.get('/auth/facebook', facebookRegister);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  googleRegister
);

export default router;
