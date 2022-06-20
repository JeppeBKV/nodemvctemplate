const router = require('express').Router();
const passport = require('passport');
const {isAuth, isAdmin} = require('./authMiddleware');

const { indexView } = require('../controllers/indexController');
const { loginView, registerView } = require('../controllers/userController');
const { loginVerify, registerVerify } = require('../controllers/verifyController')

router.get('/login', loginView);
router.get('/register', registerView);
router.get('/', indexView);
router.get('/loginVerify', loginVerify);
router.get('/registerVerify', registerVerify)

module.exports = router;