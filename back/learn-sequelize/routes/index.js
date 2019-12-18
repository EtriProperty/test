var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function(req, res) {
  fs.readFile("./views/homepage.html", function(err, data) {
    // homepage.html 로드
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" }); //HeadType 설정
      res.end(data); // 로드 html response
    }
  });
});

module.exports = router;
