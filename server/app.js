const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();


const sessionRouter = require('./routers/session');
const userRouter = require('./routers/user')
const booksRouter = require('./routers/books')
const adminRouter = require('./routers/admin');

const isAuthenticated = require('./controllers/isAuthenticated');
const isAuthorised = require('./controllers/isAuthorised');

let app = express();


let allowedOrigins = 'localhost:3000';


//  middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors({
    origin: allowedOrigins,
    credentials: true
})); //  CORS is enabled for *


//  login page  (just for)
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

//  `/session` router
app.use('/session', sessionRouter);

//  `/api` router (can only access if user is authenticated)
app.use('/user', isAuthenticated, userRouter);

//  `/books` router (to manage books)
app.use('/books', isAuthenticated, booksRouter);

//  `/admin` router (privilidged actions)
app.use('/admin', isAuthenticated, isAuthorised, adminRouter);



app.listen(process.env.PORT, _ => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});