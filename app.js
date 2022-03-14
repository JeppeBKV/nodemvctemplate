const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const expressLayouts = require('express-ejs-layouts');
//const connection = require('./dbconn');

const app = express();

// Middleware used to access form data submitted with post method in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static files folder
app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/index'));
const PORT = process.env.PORT;
app.listen(PORT, console.log("Server has started at port " + PORT));