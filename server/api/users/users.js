var express = require('express');
var router = express.Router();
var request = require('request');
//var dataBaseHandler = require('./../dataBase/dataBaseHandler');
var mongoDataBaseHandler = require('./../dataBase/mongoDataBaseHandler');
var config = require('../../config/config.json');
var userRightChecker = require('../security/user-email-right');


var removeEmailsFromResult = function(users){
    if(Array.isArray(users)){
        return users.map(function(user){
            delete user.email;
        })
    } else {
        return [];
    }
};

router.get('/',function(req,res){
    console.log('Users api page');
    res.send('Users api page');
});

router.get('/all',function(req,res){
    mongoDataBaseHandler.getAllUsers().then(
        function(result){
            res.send(removeEmailsFromResult(result))
        }, function(error){
            res.status(500).send(error);
        }
    );
});

router.get('/user/exists/:email',function(req,res){
    mongoDataBaseHandler.getUser(req.params.email).then(
        function(result){
            if(result.email){
                res.send({exists : true})
            } else {
                res.send({exists : false})
            }
        }, function(error) {
            res.status(400).send(error)
        }
    )
});

router.get('/user/:email', userRightChecker, function(req,res){
    mongoDataBaseHandler.getUser(req.params.email).then(
        function (result) {
            if(result.email){
                res.send(result);
            } else {
                res.status(404).send("User does not exist in DB");
            }
        },
        function (err) {
            res.status(400).send(err)
        }
    )
});

router.post('/user/:email', userRightChecker, function(req,res){
    //Can't modify his email. Email is check by userRightChecker
    var user = req.body;
    user.email = req.params.email;

    mongoDataBaseHandler.updateUser(user).then(function(success){
        res.send(success)
    }, function(err){
        res.status(500).send(err)
    });
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
