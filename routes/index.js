const express = require('express');

const { indexView } = require('../controllers/indexController');
const { loginView, registerView } = require('../controllers/userController');
const { loginVerify, registerVerify } = require('../controllers/verifyController')
const router = express.Router();



router.get('/login', loginView);
router.get('/register', registerView);
router.get('/', indexView);
router.get('/loginVerify', loginVerify);
router.get('/registerVerify', registerVerify)
module.exports = router;