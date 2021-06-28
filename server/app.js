const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();


const apiRouter = require('./routers/api')
const sessionRouter = require('./routers/session');

let app = express();




//  middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));



//  `/session` router
app.use('/session', sessionRouter);

//  `/api` router
app.use('/api', apiRouter);




app.listen(process.env.PORT, _ => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
});