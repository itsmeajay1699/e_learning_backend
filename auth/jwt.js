import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      console.log(payload);
      return done(null, payload);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);
