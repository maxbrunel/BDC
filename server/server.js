var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config/config.json');
var apiRouter = require('./api/index');
var request = require('request')

app.use(bodyParser.json());
app.use('/api',apiRouter);

app.use(express.static(path.resolve(__dirname + '/../client')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/app/index.html'));
});


app.listen(config.node.port || 3000,'127.0.0.1', function () {
  console.log('Server is launched on port :' + config.node.port || 3000);
});


