var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/BDC');

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    email : String,
    name : String,
    company : String,
    skills : [String],
    website : String,
    workAvailability: Boolean
});

var User = mongoose.model('User',userSchema);

var checkUser = function(user){
    if(!user){
        return false;
    }
    if(!user.skills || user.skills.length < 2){
        return false;
    }
    if(!user.email){
        return false;
    }
    if(!user.name){
        return false;
    }

    return true;
};

var userToResult = function(user){
    if(!user){
        return {};
    }
    var userSanitized = {
        email : user.email,
        name : user.name,
        company: user.company,
        skills : user.skills,
        website : user.website,
        workAvailability : user.workAvailability
    };
    if(userSanitized.website.length == 0){
        userSanitized.website = false;
    }
    return userSanitized

};

var sanitizeUser = function(user){
    if(!user){
        return {}
    }

    if(user.skills){
        user.skills.map(function(item){
            return item.replace(' ','').toUpperCase();
        });
    }

    if(!user.website){
        user.website = "";
    }
    return user;
};

module.exports = {
    getAllUsers : function(){
        return User.find({}).then(
            function(sucess){
                return sucess.map(userToResult);
            }, function(error){
                return error;
            }
        );
    },
    getUser : function(email){
        if(!email){
            email = "";
        }
        return User.findOne({email:email}).then(
            function(sucess){
                return userToResult(sucess);
            }, function(error){
                return error;
            }
        );
    },
    createUser : function(user){
        return this.getUser(user.email ? user.email : null).then(
            function(sucess){
                if(sucess.email){
                    return false;
                }
                var userToSave = sanitizeUser(user);
                if(checkUser(userToSave)){
                    return User(userToSave).save().then(
                        function(sucess){
                            return userToResult(sucess);
                        }, function(error){
                            return false;
                        }
                    )
                } else {
                    return false;
                }
            }, function(error){
                return false;
            }
        )
    },
    updateUser : function (user) {
        return User.update({email: user.email}, user,{overwrite: true})
    }
};




