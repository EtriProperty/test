const express = require("express");
const router = express();
const auth1 = require("./auth");

router.get("/", function(req, res) {
  console.log(req.cookies);
  res.render("myWishList.html");
});

router.get("/userInfoUpdate", function(req, res) {
  //   res.render("index.html"); 경로 맞음
});

module.exports = router;
