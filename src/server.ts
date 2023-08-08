import './utils/firebase';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user';
import postRouter from './routes/post';
import { protect } from './modules/auth';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import {
  AddStripeCard,
  chargeWallet,
  getUserInfo,
  subscribePlan,
} from './services/user';
import {
  getDeletedPosts,
  getPosts,
  recoverPost,
  searchPosts,
} from './services/post';
import PlanService from './routes/plan';
import AdminService from './routes/admin';
import LanguageService from './routes/language';
import CountryService from './routes/countries';
import StorageService from './routes/storage';
import SmtpService from './routes/smtp';
import ThemeService from './routes/theme';
import UploadsService from './routes/uploads';
import KeysService from './routes/keys';
import AnalyticsService from './routes/analytics';
import PaymentsService from './routes/payments';
import ChatService from './routes/chat';
import TransactionsService from './routes/transactions';
// import PvService from "./routes/juniorAdminPriviliges";
// import flash from "connect-flash";
import CategoryRoutes from './routes/category';

const app = express();
dotenv.configDotenv({
  path: '../.env',
});

app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'SECRET',
    cookie: { secure: true },
  })
);

// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: any, res, next) => {
  if (req.app.get('user')) {
    const userInfo = req.app.get('user');
    req.app.set('user', undefined);
    res.send(userInfo);
  } else {
    res.send();
  }
});

app.get('/posts', getPosts);
app.get('/posts/deleted', getDeletedPosts);
app.post('/posts/recover', recoverPost);
app.post('/search-post', searchPosts);

app.post('/createCard', protect, AddStripeCard);
app.post('/stripeCharge', protect, chargeWallet);
app.post('/subscribe', protect, subscribePlan);

app.use(userRoutes);
app.use(CategoryRoutes);
app.use(PlanService);
app.use(AdminService);
app.use(LanguageService);
app.use(CountryService);
app.use(StorageService);
app.use(SmtpService);
app.use(PaymentsService);
app.use(ThemeService);
app.use(UploadsService);
app.use(KeysService);
app.use(AnalyticsService);
app.use(ChatService);
app.use(TransactionsService);
// app.use(PvService);
app.use(protect, postRouter);
app.use('/user', protect, getUserInfo);

export default app;
