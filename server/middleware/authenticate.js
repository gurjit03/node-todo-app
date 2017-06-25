const { User } = require('../models/User.js');;

const authenticate = (req,res,next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then(user => {
    if(!user) {
      res.status(401).send({
        message: "user not found"
      })
    }

    req.user = user;
    req.token = token;
    next();
  }).catch(e => {
    res.status(401).send({
      message: 'Authentication not allowed due to improper token'
    })
  })
}

module.exports = {
  authenticate
}
