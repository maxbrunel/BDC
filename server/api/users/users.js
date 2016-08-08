var express = require('express');
var router = express.Router();
var request = require('request');
var dataBaseHandler = require('./../dataBase/dataBaseHandler');
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
    //res.send(dataBaseHandler.getAllUsers());
});

router.get('/user',function(req,res){
    if(!req.query.email){
        res.send({})
    } else {
        res.send(dataBaseHandler.getUser(req.query.email));
    }
});
router.get('/users',function(req,res){
    res.send(dataBaseHandler.getAllUsers);
});

router.post('/create',function(req,res){
    if(dataBaseHandler.createUser(req.body)){
        request.post({
            url: 'https://'+ config.slack.teamUrl + '/api/users.admin.invite',
            form: {
                email: req.body.email,
                token: config.slack.tokenAdmin,
                set_active: true
            }
        }, function(err, httpResponse, body) {});
        res.statusCode = 200;
        res.send();
    } else {
        res.statusCode = 400;
        res.send();
    }
});


module.exports = router;
