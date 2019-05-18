const express = require('express');
const db = require('../database-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config.js')

const router = express.Router()

router.get('/test', (req, res) => {
  console.log('cookie?', req.signedCookies)
  res.send("test fired")
  
})

router.post('/login', (req, res) => {
  const {userName, pass} = req.body
  const errMess = "Login information is incorrect"
  db.findUser(userName)
    .then(user => {
      if (!user[0]) {
        return res.status(500).json(errMess)
      }
      const match = bcrypt.compareSync(pass, user[0].pass)
      if (!match) {
        return res.status(500).json(errMess)
      }
      jwt.sign({
          userName: user[0].name,
          userID: user[0].id
        },
        config.jwt.secret, config.jwt.options, (err, token) => {
          if (err) {
            return res.status(500).json(err)
          }
          res.cookie('jwt', token, config.jwt.cookie)
          return res.send("Success!")
        }
      )
    })
    .catch(err => console.log(err))
})

router.post('/register', (req, res) => {
  const { userName, pass, email } = req.body
  db.findUser(userName)
    .then(user => {
      if (user[0]) {
        return res.send("User name is already taken")
      }
      const hash = bcrypt.hashSync(pass, 10)
      db.insertUser(userName, email, hash)
        .then(registration => {
          console.log('User created:')
          res.send("User created")
        })
    })
    .catch(err => console.log(err))
})

router.post('/logout', (req, res) => {
  res.clearCookie('jwt', config.jwt.cookie)
  res.send('logged out')
})

module.exports = router