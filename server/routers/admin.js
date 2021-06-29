const router = require('express').Router();
const admin = require('../services/firebase.js')



//  get list of all users for admin sorted by UID
router.get('/users/list', (req, res) => {
    //  take nextPageToken from req query
    let nextPageToken = req.query.next || '';
    let amount = req.query.amount || 100;

    admin
    .auth()
    .listUsers(amount)
    .then((listUsersResult) => {
        nextPageToken = listUsersResult.pageToken;
        res.json({success: true, data: {users: listUsersResult.users, nextPageToken}});
    })
    .catch((error) => {
        console.log('Error listing users:', error);
        res.json({success: false, error: error.messsage});
    });
});








module.exports = router;