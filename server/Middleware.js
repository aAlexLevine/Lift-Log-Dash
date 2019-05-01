const jwt = require('jsonwebtoken');
const config = require('./config.js')

const verify = (req, res, next) => {
  if (!req.signedCookies.jwt) {
    console.log('jwt not present verify')
      // next('router')
    return res.send({ value: false, error: 'Could not verify user @Middleware' })
  }
  jwt.verify(req.signedCookies.jwt, config.jwt.secret, (err, authData) => {
    if (err) {
      console.log('jwt can not verify')
      return res.send("JWT Middleware verification failed")
    } else {
      req.userID = authData.userID
      console.log('jwt accepted')
      next()
    }
  })
}

module.exports = {
  verify
}