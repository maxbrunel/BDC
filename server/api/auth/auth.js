var express = require('express');
var router = express.Router();
var request = require('request');
var slackBuilderUrl = require('./slackBuilderUrl');


router.get('/slack',function(req,res){
    request.get(slackBuilderUrl.buildUrl(req.query.code),function(error,response,body){
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.sendStatus(400);
        }
    });
});


module.exports = router;