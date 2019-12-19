var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login"); // 로그인 라우터 추가
var registerRouter = require("./routes/register"); // 회원가입 라우터 추가
var sequelize = require("./models").sequelize;
//var sequelize = require("./models") == var sequelize = require('./models/index.js')

var app = express();
sequelize
  .sync()
  .then(() => {
    console.log("✓ DB connection success.");
    console.log("  Press CTRL-C to stop\n");
  })
  .catch(err => {
    console.error(err);
    console.log("✗ DB connection error. Please make sure DB is running.");
    process.exit();
  }); // 서버 실행시 MySQL과 연동된다.  <- 실행됨과 동시에 테이블을 그리는데 테이블에s 가 붙는다.

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.engine("html", require("ejs").renderFile); // html 띄우기
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//app.use("/users", usersRouter); //api로 바꿀예정
app.use("/login", loginRouter); //로그인 api
app.use("/register", registerRouter); //회원가입 api
app.use("/", indexRouter); //메인 api

/*
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB
});

connection.connect();
*/
// connection.query("SELECT * from Persons", function(err, rows, fields) {
//   if (!err) console.log("The solution is : ", rows);
//   else console.log("Error", err);
// });

// connection.end();
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
  res.end();
});

module.exports = app;
