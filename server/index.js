const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes.js')

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
app.use('/api', apiRoutes)

app.listen(8080, function() {
  console.log('listening on port 8080*!');
});

