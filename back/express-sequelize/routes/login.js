//로그인 기능만(입력받은 비밀번호와 db의 비밀번호와 비교 후 넘겨줌)
const express = require("express");
const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
const userinfo = require("../models").userinfo;
const crypto = require("crypto");
const router = express.Router();
const jwt = require("jsonwebtoken"); //default HMAC SHA256 알고리즘 사용
const jwtSecret = require("../config/jwt");
const session = require("express-session");
const passportkey = require("../config/passport");
const FileStore = require("session-file-store")(session);

router.use(
  session({
    secret: passportkey.secret,
    resave: false,
    saveUninititallized: true,
    store: new FileStore()
  })
);

// router.use(
//   session({
//     secret: passportkey.secret,
//     resave: false,
//     saveUninititallized: false,
//     store: new FileStore()
//   })
// );

// router.post(
//   "/login_on",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/"
//   })
// );

router.post("/login_on", async function(req, res) {
  //로그인 API
  try {
    console.log("login_on 접속 성공"); //pass
    let body = req.body;
    let userid = body.userid;
    let result = await userinfo.findOne({
      //DB에서 입력된 id와 같은 컬럼 조회
      where: {
        id: userid
      }
    });
    //여기부터 안찍힘
    console.log("result : " + result.dataValues.id); // pass
    let insertpassword = crypto
      .createHash("sha512")
      .update(body.password + result.dataValues.salt)
      .digest("hex");
    console.log("입력된 패스워드 암호 성공");
    console.log("insert password : " + insertpassword);
    console.log("result password : " + result.dataValues.password);
    if (insertpassword === result.dataValues.password) {
      console.log("비밀번호 일치 통과");
      // 비밀번호 일치하는거 정상작동, json으로 데이터 넘겨주면서 redirect 하고싶음
      //json만 전송되고 리다이렉트안됨
      //jwt token 생성
      /*
      let token = jwt.sign(
        {
          id: result.dataValues.id,
          name: result.dataValues.name
        },
        jwtSecret.secret,
        {
          expiresIn: "7d"
        }
      );
      

      res.json({
        message: result.dataValues.id,
        token: token,
        result_code: 200
      });
  */
      req.session.logined = true;
      req.session.userid = body.userid;
      res.status(200).json({
        result_code: res.statusCode
      });
    } else {
      //비밀번호 불일치 소스 추가해야함
      //오류코드 만들고 redirect 하고싶음
      res.status(403).json({
        result_code: res.statusCode
      });
      //res.redirect("/login"); - json 보내면서 리다이렉트하면 오류남
    }
  } catch (error) {
    console.log("여기다");
    res.status(404).send(res.statusCode); // 여기부분 진입해도 오류남, 하고싶은게 login_on 요청시 서버에서 제대로 못받았을떄 오류보내면서 404페이지 넘겨주고싶음
  }
});

//Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
/* GET login page. */
router.get("/", function(req, res) {
  console.log("호출완료");
  res.render("signIn.html");
});

module.exports = router;
