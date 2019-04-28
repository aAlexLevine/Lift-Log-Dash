const express = require('express');
const db = require('../database-mysql');
const router = express.Router()


router.get('/items', function (req, res) {
  console.log('fireeddd')
  db.selectAll()
  .then( (response) => {
      // console.log(response)
      res.send(response)
    })
    .catch((err)=> {
      console.log(err)
    })
});

router.post('/createNewWorkout', (req, res) => {
  //run DB method takes  promise and catch 
  console.log('body--',req.body)
  db.createNewWorkOut(req.body)
    .then(response => {
      console.log('Response from DB, recieved at server createNewWorkOut', response)
      res.send(response)
    })
    .catch(err => console.log('error, server, createNewWorkOut', err))
})

router.get('/getPlans', (req, res) => {
  console.log('server ----------------')
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