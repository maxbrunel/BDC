var express = require('express');
var router = express.Router();
var request = require('request');
//var dataBaseHandler = require('./../dataBase/dataBaseHandler');
var mongoDataBaseHandler = require('./../dataBase/mongoDataBaseHandler');
var config = require('../../config/config.json');


router.get('/',function(req,res){
    console.log('Users api page');
    res.send('Users api page');
});

router.get('/all',function(req,res){
    mongoDataBaseHandler.getAllUsers().then(
        function(result){
            res.send(result)
        }, function(error){
            res.status(500).send(error);
        }
    );
});

router.get('/user',function(req,res){
    mongoDataBaseHandler.getUser(req.query.email).then(
        function(result){
            res.send(result)
        }, function(error) {
            res.send(error)
        }
    )
});

router.post('/create',function(req,res){
    mongoDataBaseHandler.createUser(req.body).then(
        function(success){
            if(success){
                request.post({
                    url: 'https://'+ config.slack.teamUrl + '/api/users.admin.invite',
                    form: {
                        email: req.body.email,
                        token: config.slack.tokenAdmin,
                        set_active: true
                    }
                }, function(err, httpResponse, body) {});
                res.send(success)
            } else {
                res.statusCode = 400;
                res.send();
            }
        }, function(error) {
            res.statusCode = 400;
            res.send(error)
        }
    )
});


module.exports = router;
