var request = require('request');

module.exports = function(req, res, next){
    if(typeof req.headers.authorization == 'undefined'){
        res.status(403).send();
    } else {
        var token = req.headers.authorization.replace("Bearer ", "");
        request.post({
            url: 'https://slack.com/api/users.identity',
            form: {
                token: token
            }
        }, function(err, httpResponse, body) {
            if(err){
                res.status(500).send();
            }
            body = JSON.parse(body);
            //TODO : CAREFULL TEAM ID
            if(body.ok && body.team.id == "T0PSA99BN" && body.user.email == req.params.email){
                next();
            } else {
                res.status(403).send();
            }
        });
    }
};
