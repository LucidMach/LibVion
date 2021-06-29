const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();


const sessionRouter = require('./routers/session');
const apiRouter = require('./routers/api')
const adminRouter = require('./routers/admin');

const isAuthenticated = require('./controllers/isAuthenticated');
const isAuthorised = require('./controllers/isAuthorised');

let app = express();




//  middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));


//  login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//  `/session` router
app.use('/session', sessionRouter);

//  `/api` router (can only access if user is authenticated)
app.use('/api', isAuthenticated, apiRouter);

//  `/admin` router
app.use('/admin', isAuthenticated, isAuthorised, adminRouter);



app.listen(process.env.PORT, _ => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
});