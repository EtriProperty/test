const jwt = require("jsonwebtoken");
const secretObj = require("../../config/jwt");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    console.log(secretObj.secret);
    req.decoded = jwt.verify(req.headers.authorization, secretObj.secret);
    return next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      //유효기간 초과
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다."
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다."
    });
  }
};
/*
const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const secretObj = require("../../config/jwt");

const auth = (req, res, next) => {
  const token = req.headers[secretObj.secret] || req.query.token;

  if (!token) {
    return res.status(403).json({
      message: "not logged in",
      result_code: res.statusCode
    });
  }

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.router.get(secretObj), (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  const onError = error => {
    res.status(403).json({
      message: error,
      result_code: res.statusCode
    });
  };

  p.then(decoded => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};
module.exports = router;
*/
