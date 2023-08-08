import express from 'express';
import passport from 'passport';
import passportGoogleAuth from 'passport-google-oauth2';
import cookieSession from 'cookie-session';
import prisma from '../db';
import { hashPassword } from '../modules/auth';
import * as dotenv from 'dotenv';
dotenv.config();

const GoogleStrategy = passportGoogleAuth.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        'https://cornerstone-backend-production.up.railway.app/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(`\n--------> Serialize User:`);
  //   console.log(user);
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.

  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('\n--------- Deserialized User:');
  // console.log(user);
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});

export default passport;
