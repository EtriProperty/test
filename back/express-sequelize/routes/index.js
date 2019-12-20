var express = require("express");
var userModel = require("../models").userinfo;
var router = express.Router();

// GET home page.
router.get("/", async (req, res, next) => {
  /*
  try {
    const userinfo_ = await userModel.findAll(); //아이디 찾을떄 사용하면될듯, 전체검색
    console.log(userinfo_);
    for (let i = 0; i < userinfo_.length; i++) {
      const { number, id, password } = userinfo_[i]["dataValues"];
      console.log("n", number, id, password);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
*/
  res.render("homepage.html");
});

module.exports = router;
