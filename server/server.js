var express = require('express');
var app = express();
var path = require('path');
var config = require('./config/config.json');


app.use(express.static(path.resolve(__dirname + '/../client')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/app/index.html'));
});


app.listen(config.node.port || 3000, function () {
  console.log('Server is launched on port :' + config.node.port || 3000);
});
