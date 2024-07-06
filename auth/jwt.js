import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      console.log(payload);
      return done(null, payload);
    } catch (error) {
      return done(error);
    }
  })
);
