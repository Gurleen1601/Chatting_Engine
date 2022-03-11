const User = require("../models/user");

module.exports.home=function(req,res){
    return res.render('home');
}
module.exports.logIn=function(req,res){
    return res.render('chat_engine');
}
module.exports.signUp=function(req,res){
    return res.render('sign_up');
}
// get the sign up data
module.exports.createUser=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({
        email:req.body.email
    },function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
             if(err){
                 console.log('error in creating user while signing up');
                 return;
             }
             return res.redirect('/');
            });
        }
        else{
           return res.redirect('back');
        }
    });
}

module.exports.signOut=function(req,res){
    req.logout();
    return res.redirect('/');
}
