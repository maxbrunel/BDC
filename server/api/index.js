var express = require('express');
var router = express.Router();
var authApi = require('./auth/auth');
var usersApi = require('./users/users');


router.get('/',function(req,res){
    res.send('Api page');
});


router.use('/auth',authApi);
router.use('/users',usersApi);


module.exports = router;
