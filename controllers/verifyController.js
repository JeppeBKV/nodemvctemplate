var register = require('../models/registerModel');
var login = require('../models/loginModel.js')

const loginVerify = (req, res) => {
    var user = new login(req.query.username, req.query.password)
    user.verify().then( function(result){
        if(result){
            res.render("index", { title: 'Frontpage', layout: './layouts/sidebar' });
        } else {
            res.render("login", { title: 'Login', layout: './layouts/sidebar' });
        }
    })
}
const registerVerify = (req, res) => {
    var person = new register(req.query.username, req.query.password, req.query.email)
    person.save().then( function(result){
        if(result){
            console.log("User made");
            res.render("login", { title: 'Login', layout: './layouts/sidebar' });
        } else {
            console.log("User not made");
            res.render("register", { title: 'Register', layout: './layouts/sidebar' });
        }
    });
}
module.exports = {
    loginVerify,
    registerVerify
}