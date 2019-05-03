var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  // password : 'FILL_ME_IN',
  database : 'test'
});

const selectAll = function(callback) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM logs', function(err, results, fields) {
      if(err) {
        // callback(err, null);
        reject(err)
      } else {
        // callback(null, results);
        resolve(results)
        console.log('--',results)
      }
    });
  })

};

const createNewWorkOut = (data) => {
  console.log('dataaaaa',data)
  
  return new Promise((resolve, reject) => {
  connection.query(`
    INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
    VALUES (now(), ${data.userID}, ${data.plan}, '${data.planGroup}');`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        // return results
        // console.log('fields in DB',fields)
        resolve(results)
      }
    })
  })
}


const getPlans = (userID) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM plans WHERE user_id =${userID};`, (err, results, fields) => {
      // connection.query(`
          // SELECT * 
          // FROM plans 
          // INNER JOIN groups ON plans.id=groups.plan_id;`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getGroups = planID => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM groups WHERE plan_id=${planID};`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getExercisesByGroup = groupID => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM exercises WHERE group_id =${groupID}`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  }) 
}

const insertSets = (set) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    INSERT INTO sets_rest (logs_id, exercise, setNum, weight, reps, rest, date)
    VALUES (${set.logID}, '${set.data.exercise}', ${set.data.setNum}, ${set.data.weight}, ${set.data.reps}, ${set.data.rest}, now())`,
      (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
  })
}

const getLastThreeLogIds = (userID, planID, group) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT * 
    FROM logs
    WHERE user_id=${userID} AND plan_id=${planID} AND plan_group='${group}' AND 
    exists (select id from sets_rest where logs_id=logs.id)
    ORDER BY dateCreated DESC
    LIMIT 3;`, 
    (err, results, fields) => {
      if(err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getLastXLogIds = (userID, qty) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT * 
    FROM logs
    WHERE user_id=${userID} AND exists (select id from sets_rest where logs_id=logs.id)
    ORDER BY dateCreated DESC
    LIMIT ${qty};`, 
    (err, results, fields) => {
      if(err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getSetsRestByLogid = (logID) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT *
    FROM sets_rest
    INNER JOIN logs on sets_rest.logs_id=logs.id
    WHERE logs_id=${logID}
    ORDER BY exercise;`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getAllWorkoutLogsByGroup = (userID, planID, group) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      SELECT *
      FROM logs
      WHERE user_id=${userID} AND plan_id=${planID} AND plan_group='${group}' AND 
      exists (select id from sets_rest where logs_id=logs.id)
      ORDER BY dateCreated`, 
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
    })
  })
}

const insertUser = (userName, email, hash) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      INSERT INTO users (name, email, pass)
      VALUES ('${userName}', '${email}', '${hash}')`, 
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
    })
  })
}

const findUser = (userName) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      SELECT * 
      FROM users
      WHERE name='${userName}'`, 
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
    })
  })
}

const insertNewPlan = (userID, planName) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      INSERT INTO plans (user_id, planName)
      VALUES (${userID}, '${planName}')`, 
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
  })
}

const insertNewGroup = (title, planID, setCount) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      INSERT INTO groups (title, plan_id, setCount)
      VALUES ('${title}', ${planID}, ${setCount})`, 
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
  })
}

const insertNewExercise = (name, numOfReps ,planID, groupID) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      INSERT INTO exercises (name, numOfReps, plan_id, group_id)
      VALUES ('${name}', ${numOfReps}, ${planID}, ${groupID})`, 
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
  })
}

module.exports = {
  selectAll,
  createNewWorkOut,
  getPlans,
  getGroups,
  getExercisesByGroup,
  insertSets,
  getLastThreeLogIds,
  getLastXLogIds,
  getSetsRestByLogid,
  getAllWorkoutLogsByGroup,
  insertUser,
  findUser,
  insertNewPlan,
  insertNewGroup,
  insertNewExercise
};
