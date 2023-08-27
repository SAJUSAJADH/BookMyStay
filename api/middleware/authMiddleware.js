const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;
const cookieParser = require('cookie-parser');
const User = require("../model/user");






function authenticateJWT (req, res, next){
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        req.user = userData;
        next();
      });
    } else {
      res.json(null);
    }
  }


  module.exports = authenticateJWT;