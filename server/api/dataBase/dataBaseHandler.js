var config = require('./../../config/config');
var JsonDB = require('node-json-db');


var db = new JsonDB(config.dataBase, true, false);

var getAllUsers = function(){
    try {
        return db.getData("/users");
    } catch (error) {
        return {}
    }
};


module.exports = {
    getAllUsers : getAllUsers(),
    getUser : function(email){
        if(!email){
            return {};
        }
        try {
            return db.getData("/users/" + email );
        } catch (error) {
            console.log(error);
            return {}
        }
    },
    createUser : function(user){
        if(!user.email || !this.getUser(user.email)){
            return false;
        } else {
            var userSanitize = user;
            userSanitize.skills.forEach(function(item){
                item = item.replace(' ','');
                item = item.toUpperCase();
            });
            db.push("/users/" + user.email,userSanitize);
            return true;
        }
    }
};
