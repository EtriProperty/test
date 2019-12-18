var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login"); // 로그인 라우터 추가
var registerRouter = require("./routes/register"); // 회원가입 라우터 추가
var sequelize = require("./models").sequelize;
//var sequelize = require("./models") == var sequelize = require('./models/index.js')

var app = express();
sequelize.sync(); // 서버 실행시 MySQL과 연동된다.

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.engine("html", require("pug").renderFile); // html 띄우기

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter); //메인 api
//app.use("/users", usersRouter); //회원가입 api로 바꿀예정
app.use("/login", loginRouter); //로그인 api
app.use("/register", registerRouter); //회원가입 api

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
