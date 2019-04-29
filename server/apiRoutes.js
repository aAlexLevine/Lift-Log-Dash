const express = require('express');
const db = require('../database-mysql');
const jwt = require('jsonwebtoken');
const config = require('./config.js')

const router = express.Router()

// Verify jwt Middleware
router.use((req, res, next) => {
  if (!req.signedCookies.jwt) {
    console.log('jwt not present verify')
    return next('router')
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
})

router.get('/test', function (req, res) {
  res.send('----response test')
});

router.post('/createNewWorkout', (req, res) => {
  db.createNewWorkOut(req.body)
    .then(response => {
      console.log('Response from DB, recieved at server createNewWorkOut', response)
      res.send(response)
    })
    .catch(err => console.log('error, server, createNewWorkOut', err))
})

router.get('/getPlans', (req, res) => {
  db.getPlans(req.query.user)
    .then( response => res.send(response))
    .catch( err => console.log(err))
})

router.get('/getGroups', (req, res) => {
  db.getGroups(req.query.id)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

router.get('/getExercisesByGroup', (req, res) => {
  db.getExercisesByGroup(req.query.groupID)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

router.post('/insertSets', (req, res) => {
  db.insertSets(req.body)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

router.get('/getLastThreeLogIds', (req, res) => {
  const {userID, planID, group} = req.query
  db.getLastThreeLogIds(userID, planID, group)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

router.get('/getSetsRestByLogid', (req, res) => {
  console.log('server log id', req.query.logID)
  db.getSetsRestByLogid(req.query.logID)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

router.get('/getAllWorkoutLogsByGroup', (req, res) => {
  const {userID, planID, group} = req.query
  db.getAllWorkoutLogsByGroup(userID, planID, group)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

module.exports = router