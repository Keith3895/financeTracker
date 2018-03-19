var middlewareObj = {};
const jsonwebtoken = require('jsonwebtoken');
middlewareObj.jwtCheck = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.salt, (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      res.send("unauth");
      next();
    }
  }
module.exports = middlewareObj;