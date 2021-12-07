require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send({ error: "token-not-valid" });
      } else {
        req.decodedToken = decodedToken
        next();
      }
    });
  } else {
    res.status(401).send({ error: "token-does-not-exist" });
  }
};