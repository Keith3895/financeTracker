var middlewareObj = {};
const jsonwebtoken = require('jsonwebtoken');
middlewareObj.jwtCheck = (req, res, next) => {
  console.log(req.headers);
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.salt, (err, decode) => {
      if (err) {
      req.user = undefined;
      return res.send("unauth");
      }
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    return res.send("unauth");
  }
}
module.exports = middlewareObj;