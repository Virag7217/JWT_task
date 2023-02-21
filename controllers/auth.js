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
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }
    return User.create({ email, password: hash })
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return console.log("User not found");
      }
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          const token = jwt.sign({ email: user.email }, secretKey, {
            expiresIn: "1h",
          });
          console.log(token);
          return token;
        }).then(user => {
          res.redirect('/');
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};
