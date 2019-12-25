const express = require("express");
const userModel = require("../models").userinfo;
const router = express.Router();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passportkey = require("../config/passport");

// router.use(
//   session({
//     secret: passportkey.secret,
//     resave: false,
//     saveUninititallized: true,
//     store: new FileStore()
//   })
// );

router.get("/", (req, res, next) => {
  res.render("index.html");
});
/*
router.get("/", function(req, res, next){
  if(req.session.logined)
  res.render('logout', {session: req.session})
  else{
    res.render("login",{session: req.session})
  }
})
*/
// GET home page.
// router.get("/", async (req, res, next) => {
//   try {
//     res.render("index.html");
//   } catch (error) {
//     // res.status(500).json({ error: error.toString() }); 이거 써도되는건가
//     const err = new Error("Not Found");
//     err.status = 404;
//     next(err);
//   }
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

});
*/
module.exports = router;
