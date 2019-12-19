var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET register page. */
router.get("/", function(req, res) {
  res.render("register.html");
  /*
  fs.readFile("./views/register.html", function(err, data) {
    // register.html 로드
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" }); //HeadType 설정
      res.end(data); // 로드 html response
    }
  });
  */
});

module.exports = router;
