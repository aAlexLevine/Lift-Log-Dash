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
  console.log('user---',req.userID)
  db.createNewWorkOut(req.body, req.userID, )
    .then(response => {
      console.log('Response from DB, recieved at server createNewWorkOut', response)
      res.send(response)
    })
    .catch(err => console.log('error, server, createNewWorkOut', err))
})

router.get('/getPlans', (req, res) => {
  db.getPlans(req.userID)
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
  const { planID, group } = req.query
  db.getLastThreeLogIds(req.userID, planID, group)
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
  const {planID, group} = req.query
  db.getAllWorkoutLogsByGroup(req.userID, planID, group)
    .then(response => res.send(response))
    .catch(err => console.log(err))
})

router.post('/createNewPlan', (req, res) => {
  const planForm  = req.body
  const { userID } = req
  db.insertNewPlan(userID, planForm.planName)
  .then(response => response.insertId)
  .then(plan => {
    planForm.groups.forEach((group, i) => {
      db.insertNewGroup(group.title, plan, group.defaultSets)
        .then(result => {
          planForm.groups[i].exercises.forEach(ex => {
            db.insertNewExercise(ex.name, ex.defaultReps, plan, result.insertId)
          })
        })
    })
    res.send('Plan created.')
  })
  .catch(err => console.log(err))
})

router.post('/submitWorkout', (req, res, next) => {
  const { workoutData, logID, date } = req.body
  for (let row in workoutData) {
    for (let set in workoutData[row]) {
      const setData = {
        logID,
        data: workoutData[row][set],
        date: date
      }
      db.insertSets(setData)
        .catch(err => console.log(err))
    }
  }
  res.send('submitting sets...')
})

module.exports = router