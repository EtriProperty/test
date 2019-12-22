//로그인 기능만(입력받은 비밀번호와 db의 비밀번호와 비교 후 넘겨줌)
const express = require("express");
const login = require("../models").userinfo;
const crypto = require("crypto");
const router = express.Router();
const jwt = require("jsonwebtoken"); //default HMAC SHA256 알고리즘 사용
const secretObj = require("../config/jwt");

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
      //DB에서 입력된 id와 같은 컬럼 조회
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
      //jwt token 생성
      let token = jwt.sign(
        {
          id: result.dataValues.id,
          name: result.dataValues.name
        },
        secretObj.secret,
        {
          expiresIn: "7d"
        }
      );
      res.cookie("user", token); //쿠키로 id와 token 전송
      //json 으로 message는 userid, token , 상태코드 전송
      res.json({
        message: result.dataValues.id,
        token: token,
        result_code: 200
      });
      //res.redirect("index.html"); //로그인은 정상되었는데 메인페이지로 보내주고싶음
    } else {
      //비밀번호 불일치 소스 추가해야함
      //오류코드 만들고 redirect 하고싶음
      res.status(403).json({
        result_code: res.statusCode
      });
      //res.redirect("/login"); - json 보내면서 리다이렉트하면 오류남
    }
  } catch (error) {
    res.status(404).send(res.statusCode); // 여기부분 진입해도 오류남, 하고싶은게 login_on 요청시 서버에서 제대로 못받았을떄 오류보내면서 404페이지 넘겨주고싶음
  }
});

module.exports = router;
