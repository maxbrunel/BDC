var express = require('express');
var router = express.Router();
var dataBaseHandler = require('./../dataBase/dataBaseHandler');

router.get('/',function(req,res){
    console.log('Users api page');
    res.send('Users api page');
});

router.get('/all',function(req,res){
    res.send(dataBaseHandler.getAllUsers);
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
        res.statusCode = 200;
        res.send();
    } else {
        res.statusCode = 400;
        res.send();
    }
});


module.exports = router;
