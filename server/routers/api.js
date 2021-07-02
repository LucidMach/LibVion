const router = require('express').Router();
const admin = require('../services/firebase')



//  get current user's data for `profile`!
router.get('/me', (req, res) => {
    admin
    .auth()
    .getUser(req.user.uid)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        // console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        res.json({success: true, user: userRecord.toJSON()});
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
        res.json({success: false, error: error.message});
    });
});



//  update current user's data (displayName & phoneNumber for now)
router.put('/me/update', (req, res) => {
    //  take any field from req body
    const { phoneNumber, displayName } = req.body;
    
    admin
    .auth()
    .updateUser(req.user.uid, {
        phoneNumber,
        displayName
    })
    .then((userRecord) => {
        // console.log('Successfully updated user', userRecord.toJSON());
        res.json({success: true, user: userRecord.toJSON()});
    })
    .catch((error) => {
        console.log('Error updating user:', error);
        res.json({success: true, error: error.message});
    });
});



//  delete current user         
router.delete('/me/delete', (req, res) => {
    /**
     * @todo passoword check
     * we can also do a password check first, like:
        * take password in req body from user,
        * verify it here
        * if verified, only then perform action
    */

    admin
    .auth()
    .deleteUser(req.user.uid)
    .then(() => {
        // console.log('Successfully deleted user');
        res.json({success: true});
    })
    .catch((error) => {
        console.log('Error deleting user:', error);
        res.json({success: false, error: error.message});
    });
});




module.exports = router;