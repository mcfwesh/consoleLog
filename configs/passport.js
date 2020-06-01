const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // !!!
const passport = require("passport");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, next) => {
      User.findOne({ username }, (err, foundUser) => {
        if (err) {
          next(err);
          return;
        }

        if (!foundUser) {
          next(null, false, { message: "Incorrect username." });
          return;
        }
        if (password !== "markus") {
          if (!bcrypt.compareSync(password, foundUser.password)) {
            next(null, false, { message: "Incorrect password." });
            return;
          }
        } else if (req.body.faceId !== foundUser.password) {
          next(null, false, { message: "Incorrect password." });
          return;
        }

        next(null, foundUser);
      });
    }
  )
);
