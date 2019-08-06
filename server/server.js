const express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");

const app = express();
const dbRoutes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
mongoose.connect(process.env.MONGODB_URI);

var session = require("express-session");

app.use(express.static("public"));
app.use(
  session({
    secret: "cats"
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/db", dbRoutes);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
