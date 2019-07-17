const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set folders for resources
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jsjquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


// allow to use body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//routes 
app.get('/', async (req, res) => {
    res.redirect('/notes')
});

//load routes
const notes_route = require('./routes/notes');

//middleware
app.use('/notes', notes_route);

//connect database
mongoose.connect(process.env.MYCONNECTION,
    { useNewUrlParser: true },
    () => console.log('yeay connected!'));

//this is to listen the port
const port = process.env.PORT;
app.listen(port, function () {
    console.log('the server runs at ' + port);
});