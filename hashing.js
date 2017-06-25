//const {SHA256} = require('crypto');
const bcrypt = require('bcryptjs');

const password = 'my-password';

bcrypt.genSalt(10,(err,salt) => {
  bcrypt.hash(password,salt,(err,hashPassword) => {
    
  })
})
