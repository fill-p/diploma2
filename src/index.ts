import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import User from "./User";
import { IMongoDBUser, IUser } from "./types";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

dotenv.config();

const app = express();

mongoose.connect(
  `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log("mongo success");
    err != null ? console.log(err) : console.log("not err");
  }
);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: IMongoDBUser, done: any) => {
  return done(null, user._id);
});

passport.deserializeUser((id: string, done: any) => {
  User.findById(id, (err: Error, doc: IMongoDBUser) => {
    return done(null, doc);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    function (_: any, __: any, profile: any, cb: any) {
      User.findOne(
        { googleId: profile.id },
        async (err: Error, doc: IMongoDBUser) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            const newUser = new User({
              googleId: profile.id,
              username: profile.name.givenName,
            });

            await newUser.save();
            cb(null, newUser);
          }
          cb(null, doc);
        }
      );
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: `${process.env.TWITTER_CLIENT_ID}`,
      consumerSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
      callbackURL: "/auth/twitter/callback",
    },
    function (_: any, __: any, profile: any, cb: any) {
      User.findOne(
        { twitterId: profile.id },
        async (err: Error, doc: IMongoDBUser) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            const newUser = new User({
              twitterId: profile.id,
              username: profile.username,
            });

            await newUser.save();
            cb(null, newUser);
          }
          cb(null, doc);
        }
      );
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: "/auth/github/callback",
    },
    function (_: any, __: any, profile: any, cb: any) {
      User.findOne(
        { githubId: profile.id },
        async (err: Error, doc: IMongoDBUser) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            const newUser = new User({
              githubId: profile.id,
              username: profile.username,
            });

            await newUser.save();
            cb(null, newUser);
          }
          cb(null, doc);
        }
      );
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    //session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login",
    // session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    // session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

app.get("/", (req, res) => {
  res.send("hell");
});

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

app.get("/auth/logout", (req, res, next) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.send("done");
  }
});

app.listen(4000, () => {
  console.log("server started");
});
