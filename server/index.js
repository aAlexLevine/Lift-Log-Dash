const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const apiRoutes = require('./apiRoutes.js')
const authRoutes = require('./authRoutes.js')
const config = require('./config.js')


const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
app.use(cookieParser(config.jwt.secret))
app.use('/api', apiRoutes)
app.use('/api/auth', authRoutes)

app.listen(8080, function() {
  console.log('listening on port 8080*!');
});

