var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* Base get post method ...*/
router.post("/", function(req, res, next) {
  console.log("post 메소드의 / 주소 때만 실행");
  next("route"); // 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을떄
});

router.get("/", function(req, res, next) {
  console.log("get 메소드의 / 주소 때만 실행");
});

router.get("/users/:id", function(req, res) {
  console.log(req.params, req.query);
  // :id 들은 req.params 객체 안에있으며 :id면 req.params.id 로 , :type 이면 req.params.type 으로 조회
  // 쿼리스트링을 쓸때는 req.query 객체에 있음
  // /users/123?limit=5&skip=10 주소 요청들어오면
  // req.params  = { id : '123'}
  // req.query = { limit: '5', skip: '10' }
});
// router.get('/', middleware1, middleware2, middleware3); 실제 라우터 로직이 실행되는 미들웨어 전에 로그인 여부 또는 관리자 여부 체크하는 미들웨어를 중간에 넣어둘때 예시

router.get("/login", function(err, req, res) {
  res.redirect("/");
  // 예를 들어 로그인 완료 후 다시 메인화면으로 돌아갈떄
  // res.redirect(메인화면주소);
  if (err) {
    res.write(err);
  }
});
module.exports = router;
