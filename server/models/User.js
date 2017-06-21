const mongoose = require('mongoose');

const UserSchema = {
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true
  }
}

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
