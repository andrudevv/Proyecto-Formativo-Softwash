
const Jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { config } = require('../config/config');

const authRequired = (req, res, next) => {
  cookieParser()(req, res, () => {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        message: "no esta autorizado su ingreso",
      });
    Jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "invalid token",
        });
      }
      req.user = user;
      next();
    });
    // const token = req.cookies.token;
  });
};
module.exports = authRequired;