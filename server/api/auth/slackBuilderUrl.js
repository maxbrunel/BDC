var config = require('../../config/config.json');



module.exports = {
    buildUrl : function(code){
        if(!code){
            return "";
        }
        return config.slack.url + "/oauth.access?client_id=" + config.slack.clientID + "&client_secret=" + config.slack.clientSecret  + "&code=" + code
    }
};