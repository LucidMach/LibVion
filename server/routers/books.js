let router = require('express').Router();




router.get('/', (req, res) => {
    res.json({success: true});
});





module.exports = router;