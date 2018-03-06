var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    unique:true
  },
  password: {
    type: String
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


mongoose.model('User', UserSchema);