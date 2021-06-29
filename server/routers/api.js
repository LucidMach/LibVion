const router = require('express').Router();
const admin = require('../services/firebase')



//  get current user's data for `profile`
router.get('/me', (req, res) => {
    admin
    .auth()
    .getUser(req.user.uid)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        res.json({success: true, user: userRecord.toJSON()});
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
        res.json({success: false, error: error.message});
    });
});







module.exports = router;