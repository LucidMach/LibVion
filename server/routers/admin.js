const router = require('express').Router();
const admin = require('../services/firebase.js')




router.get('/', (req, res) => {
    res.json({success: true, message: "you're definitely an Admin 😇"});
});








module.exports = router;