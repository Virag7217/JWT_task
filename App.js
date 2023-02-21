const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utility/database");
const User = require("./models/user");

const app = express();
const authroutes = require("./routes/auth");
const shoproutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authroutes);
app.use(shoproutes);
app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    const port = 3080;
    app.listen(port, () => {
      console.log(`server is running. Port = ${port} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });