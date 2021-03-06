const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    minlength: 1,
    validate : {
      validator : validator.isEmail,
      message : '{VALUE} is not an email'
    }
  },
  password: {
    type: String,
    require: [true, "password is required"],
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObj = user.toObject();

  return {
    _id : userObj._id,
    email: userObj.email
  }
}

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id : user._id.toHexString(), access},'secretkey').toString();

  user.tokens.push({
    token,
    access
  })

  return user.save().then(() => {
    return token;
  })
}

UserSchema.statics.findByToken = function(token) {
  let decodedUserObj;

  try {
    decodedUserObj = jwt.verify(token,'secretkey');
  }catch(e) {
    return Promise.reject('issue with token')
  }

  return User.findOne({
    '_id': decodedUserObj._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.pre('save',function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hashPassword) => {
          user.password = hashPassword;
          next();
      })
    })
  }else {
    next();
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
