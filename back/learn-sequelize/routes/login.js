//로그인 기능만(입력받은 비밀번호와 db의 비밀번호와 비교 후 넘겨줌)
//db랑 어떻게 연결되는건지 체크가 안됨, 정상작동인지 테스트 못함
var express = require("express");
var login = require("../models").userinfo;
var crypto = require("crypto");
var fs = require("fs");

var router = express.Router();

/* GET login page. */
router.get("/", function(req, res) {
  res.render("login.html");
  /*
  fs.readFile("./views/login.html", function(err, data) {
    // login.html 로드
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" }); //HeadType 설정
      res.end(data); // 로드 html response
    }
  });
  */
});

/* 테스트 안했음
router.post("/login_on", async function(req, res, next) {
  let body = req.body;
  let result = await login.findOne({
    where: {
      email: body.email
    }
  });
  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  if (dbPassword === hashPassword) {
    console.log("비밀번호 일치");
    res.json({
      message: "userId",
      result_code: 200
    });
    res.redirect("/index");
  } else {
    console.log("비밀번호 불일치");
    res.redirect("/index");
  }
});
*/
module.exports = router;
