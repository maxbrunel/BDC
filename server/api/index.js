var express = require('express');
var router = express.Router();
var authApi = require('./auth/auth');
var usersApi = require('./users/users');
var mongoDb = require('./dataBase/mongoDataBaseHandler');


router.get('/',function(req,res){
    res.send('Api page');
});

router.get('/test',function(req,res){
    if(req.query.email){
        mongoDb.getUser(req.query.email).then(
            function(success){
                if(success.email){
                    res.send(success);
                } else {
                    res.status(404).send();
                }
            }, function (error){
                res.status(500).send(error);
            }
        )
    } else if(req.query.create){
        mongoDb.createUser(
            {
                email:req.query.create
            }
        ).then(function(success){
                if(success){
                    res.send(success)
                } else {
                    res.status(400).send()
                }
            },function(error){
                res.status(500).send()
            })
    }
    else {
        mongoDb.getAllUsers().then(
            function(success){
                res.send(success);
            }, function (error){
                res.status(500).send(error);
            }
        )
    }
});


router.use('/auth',authApi);
router.use('/users',usersApi);


module.exports = router;
