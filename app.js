// express express-session passport passport-google-oauth2

const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth");

const app = express();

function isLoggedIn(req, res, next) {
  console.log("user:", req.user);
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);
app.get("/auth/failure", (req, res) => {
  res.send("failure");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`protected for ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("good bye");
});

app.listen(3000, () => {
  console.log("Test Port ");
});
