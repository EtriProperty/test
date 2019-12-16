require("dotenv").config(); //.env 사용으로 인한 모듈 추가
var createError = require("http-errors"); // createError 함수 사용하기 위해
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); // 요청에 대한 로그들에 대한 정보를 기록해주기 위해

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
//다음소스는 같은 소스이다.

app.use(
  logger("dev"),
  express.static(path.join(__dirname, "public")),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser()
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.render("error");
});

module.exports = app;

//아래가 원래 커넥트 했던 mysql 소스이고 dotenv 는 설치한상태이고 이걸 이용해서 mysql 접속 테스트해야할것
//.env 파일만들고 내용넣어야함
// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root1234",
//   port: 3306,
//   database: "my_db"
// });

// connection.connect();

// connection.query("SELECT * from Persons", function(err, rows, fields) {
//   if (!err) console.log("The solution is : ", rows);
//   else console.log("Error", err);
// });

// connection.end();
