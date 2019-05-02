const express = require('express');
const db = require('../database-mysql');
const jwt = require('jsonwebtoken');
const config = require('./config.js')
const middleWare = require('./Middleware.js')

const router = express.Router()
router.use(middleWare.verify)

router.get('/isAuth', function (req, res) {
  res.send({value: true})
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

router.get('/getLastXLogIds', (req, res) => {
  const { qty } = req.query
  const { userID } = req
  db.getLastXLogIds(userID, qty)
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