var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = (req, res) => {
  var newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err
      }); 
    } else {
      user.password = undefined;
      return res.json(user);
    }
  });
};

exports.sign_in = (req, res) => {
  User.findOne({
    userName:req.body.userName
  }, (err, user) => {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(406).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    let options = {};
    if(!req.body.remember)
    options ={
      expiresIn: '1h'
    };
    return res.json({ token: jwt.sign({ userName: user.userName, _id: user._id }, process.env.salt,options),user:user.userName });
  });
};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};