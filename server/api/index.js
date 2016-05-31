var express = require('express');
var router = express.Router();
var authApi = require('./auth/auth');


router.get('/',function(req,res){
    res.send('Api page');
});


router.use('/auth',authApi);


module.exports = router;
