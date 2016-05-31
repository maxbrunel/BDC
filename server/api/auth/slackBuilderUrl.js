var config = require('../../config/config.json');



module.exports = {
    buildUrl : function(code){
        if(!code){
            return "";
        }
        return "https://slack.com/api/oauth.access?client_id=" + config.slack.clientID + "&client_secret=" + config.slack.clientSecret  + "&code=" + code
    }
};