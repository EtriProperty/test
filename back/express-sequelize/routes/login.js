//로그인 기능만(입력받은 비밀번호와 db의 비밀번호와 비교 후 넘겨줌)
const express = require("express");
const login = require("../models").userinfo;
const crypto = require("crypto");
const router = express.Router();

/* GET login page. */
router.get("/", function(req, res) {
  try {
    res.render("signIn.html");
  } catch (error) {
    res.status(500).json(res.statusCode);
  }
});

router.post("/login_on", async function(req, res) {
  //로그인 API
  try {
    let body = req.body;
    let userid = body.userid;
    let result = await login.findOne({
      where: {
        id: body.userid
      }
    });
    let insertpassword = crypto
      .createHash("sha512")
      .update(body.password + result.dataValues.salt)
      .digest("hex");
    if (insertpassword === result.dataValues.password) {
      // 비밀번호 일치하는거 정상작동, json으로 데이터 넘겨주면서 redirect 하고싶음
      //json만 전송되고 리다이렉트안됨
      console.log("비밀번호 일치");
      res.json({
        message: body.userid,
        result_code: 200
      });
      //res.redirect("index.html");
    } else {
      //비밀번호 불일치 소스 추가해야함
      //오류코드 만들고 redirect 하고싶음
    }
  } catch (error) {
    res.status(404).json(res.statusCode);
  }
});

module.exports = router;
