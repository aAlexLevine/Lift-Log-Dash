const express = require('express');
const db = require('../database-mysql');

const router = express.Router()

const A = 'A'
const B = 'B'

const createSets = (exercises) => {
  const setCount = 5
  const allDataCells = {}
  for (let exercise of exercises) {
    const {
      name,
      weight,
      reps
    } = exercise
    allDataCells[name] = {}
    for (let i = 1; i <= setCount; i++) {
      allDataCells[name]['set' + i] = {
        exercise: name,
        setNum: i,
        weight: weight + 5,
        reps: reps,
        rest: null
      }
    }
    exercise.weight += 5
  }
  return allDataCells
}

const exercisesA = [
  {
    name:'Dead-Lift',
    weight: 200,
    reps: 5
  },
  {
    name: 'Over-head Press',
    weight: 105,
    reps: 5
  },
  {
    name: 'Front Squat',
    weight: 135,
    reps: 5
  },
  {
    name: 'Single Leg DL',
    weight: 25,
    reps: 8
  },
]

const exercisesB = [
  {
    name: 'Back Squat',
    weight: 215,
    reps: 5
  },
  {
    name: 'Hip Thrust',
    weight: 205,
    reps: 5
  },
  {
    name: 'Bench Press',
    weight: 155,
    reps: 5
  },
]


const logs = [
  {
    date: '2019-11-01 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-11-03 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },
  {
    date: '2019-11-05 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-11-08 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },
  {
    date: '2019-11-11 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-11-13 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },
  {
    date: '2019-11-15 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-11-18 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },
  {
    date: '2019-11-20 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-11-22 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },
  {
    date: '2019-11-25 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-11-27 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },
  {
    date: '2019-11-29 15:24:54',
    sets: createSets(exercisesA),
    planGroup: A
  },
  {
    date: '2019-12-01 15:24:54',
    sets: createSets(exercisesB),
    planGroup: B
  },


]



router.post('/addLogsThenSets', (req, res) => { 
  for (let i = 0; i < logs.length; i++) {
    
    const plan = 27
    const userID = 1
    const date = logs[i].date
    const planGroup = logs[i].planGroup


    db.createNewWorkOut({
        date,
        userID,
        plan,
        planGroup
      })
      .then(result => {
        const workoutData = logs[i].sets
        for (let row in workoutData) {
          for (let set in workoutData[row]) {
            const setData = {
              logID: result.insertId,
              data: workoutData[row][set],
              date: date
            }
            db.insertSets(setData)
              .catch(err => console.log(err))
          }
        }
      })
  }
  res.send('Building Demo')
})

module.exports = router;


  //demo logs in as demo user
  //on logout if user is demo user
    //delete all exercises that are not demo
    //delete all groups that are not demo groups
    //delete all plans that are not demo plans
    //delete all sets that are not demo
    //delete all logs that are not demo logs