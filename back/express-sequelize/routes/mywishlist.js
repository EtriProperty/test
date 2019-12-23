const express = require("express");
const router = express();
const { verifyToken } = require("./auth");

router.get("/userInfoUpdate", function(req, res) {
  //   res.render("index.html"); 경로 맞음
});
/*
router.get("/", verifytoken, (req, res) => {
  res.json(req.decoded);
  //   res.render("myWishList.html");
});
*/

router.get("/", verifyToken, (req, res) => {
  res.render("myWishList.html");
});

module.exports = router;
