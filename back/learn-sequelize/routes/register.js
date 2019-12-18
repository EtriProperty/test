var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET register page. */
router.get("/register", function(req, res) {
  fs.readFile("./views/register.html", function(err, data) {
    // register.html 로드
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" }); //HeadType 설정
      res.end(data); // 로드 html response
    }
  });
});

module.exports = router;
