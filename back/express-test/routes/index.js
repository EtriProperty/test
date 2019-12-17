var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* Base get post method ...*/
router.post("/", function(req, res, next) {
  console.log("post 메소드의 / 주소 때만 실행");
});

router.get("/", function(req, res, next) {
  console.log("get 메소드의 / 주소 때만 실행");
});

module.exports = router;
