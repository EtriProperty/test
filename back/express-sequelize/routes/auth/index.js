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
