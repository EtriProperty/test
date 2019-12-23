const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var port = 3000;
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const sequelize = require("./models").sequelize;
const authRouter = require("./routes/auth");
const mywishlist = require("./routes/mywishlist");
const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const sessionkey = require("./config/session");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    keys: sessionkey.secret,
    cookie: {
      maxAge: 604800
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/login", loginRouter); //로그인 api
app.use("/register", registerRouter); //회원가입 api
app.use("/mywishlist", mywishlist);
app.use("/", indexRouter); //메인 api

sequelize.sync();

app.listen(port, function() {
  console.log("express start");
});

module.exports = app;
