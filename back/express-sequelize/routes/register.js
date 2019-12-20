const express = require("express");
const router = express.Router();
const user = require("../models").userinfo;
const crypto = require("crypto");

/* GET register page. */
router.get("/", function(req, res) {
  try {
    res.render("register.html");
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/register_on", async function(req, res) {
  try {
    let result = await user.findAll({
      where: {
        id: req.body.userid
      }
    });
    if (Object.keys(result).length === 0) {
      //중복 아이디가 없을떄
      let body = req.body;
      let salt = Math.round(new Date().valueOf() * Math.random()) + "";
      let hashPassword = crypto
        .createHash("sha512")
        .update(body.userpassword + salt)
        .digest("hex");
      await user.create({
        //DB에 저장, 잘들어감
        id: body.userid,
        password: hashPassword,
        name: body.username,
        email: body.useremail,
        phone: body.userphonenumber,
        auth: 1
      });
      res.redirect("/"); // 수정필요, 회원가입완료 페이지로 가야함
    } else {
      //아이디가 이미 있을때, 409 에러 던져줌
      res.status(409).json(res.statusCode);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

/*
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
    */
module.exports = router;
