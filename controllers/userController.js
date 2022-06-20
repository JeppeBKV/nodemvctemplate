var register = require('../models/registerModel');
var login = require('../models/loginModel.js')

const loginView = (req, res) => {
    res.render("login", { title: 'Login', layout: './layouts/sidebar' });
}

const registerView = (req, res) => {
    res.render("register", { title: 'Register', layout: './layouts/sidebar' });
}

module.exports = {
    loginView,
    registerView
}