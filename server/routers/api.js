const router = require('express').Router();
const admin = require('../services/firebase.js')




router.get('/', (req, res) => {
    res.send('hello world!');
});








module.exports = router;