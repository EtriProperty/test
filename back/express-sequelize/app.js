const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var port = 3000;
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const Sequelize = require("sequelize");
const sequelize = require("./models").sequelize;
const authRouter = require("./routes/auth");
const mywishlist = require("./routes/mywishlist");
const passportkey = require("./config/passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: passportkey.secret,
    resave: false,
    saveUninititallized: false,
    store: new FileStore()
  })
);

const passport = require("passport"); //passport module add
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "userid",
      passwordField: "password"
    },

    function(username, password, done) {
      console.log("LocalStrategy", username, password);
      /*
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
      */
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.post(
  "/login_on",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.use("/login", loginRouter); //로그인 api
app.use("/register", registerRouter); //회원가입 api
app.use("/mywishlist", mywishlist);
app.use("/", indexRouter); //메인 api

// sequelize.sync();

app.listen(port, function() {
  console.log("express start");
});

module.exports = app;
