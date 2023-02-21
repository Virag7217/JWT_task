const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "virag";

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
  });
};

exports.postSignup = (req, res, next) => {
  const saltRounds = 12;
  const { email, password } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPwd) => {
      return User.create({ email, password: hashedPwd }).then((result) => {
        res.redirect("/login");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req);
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return console.log("User not found");
      }
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            {
              expiresIn: "1h",
            }
          );
          console.log(token);
          return res.json({ message: "Login Successful!", token });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.send("Please add token to");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, auth) => {
    if (err) {
      console.error(err);
      return res.send("Error");
    }
    res.send({
      result: "user valid",
      auth,
    });
  });
};
