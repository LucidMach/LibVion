const router = require('express').Router();
const admin = require('../services/firebase.js')



//  just intro
router.get('/', (req, res) => {
    res.send('login or logout!');
});



/**  @todo - need a fix - creating anonymous user instead of email-password user */
router.post('/signup', async (req, res) => {
    let { email, password, displayName } = req.body;

    console.log(email, password, displayName)

    /**  @todo regex validations for password, username etc.... */


    await admin
    .auth()
    .createUser({
        email, password, displayName
    })
    .then((user) => {
        console.log('Successfully created new user:', user.uid);
        res.json({success: true, user});
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
        res.status(401).json({success: false, error});
    });
});




/*  # login
    1. get JWT in req body, 
    2. create a session cookie from it 
    3. forward req to `/app`
*/
router.post("/login", (req, res) => {
    const idToken = req.body.idToken.toString();
    //  expiry date (currently = 6 days)
    const expiresIn = 60 * 60 * 24 * 6 * 1000;

    admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })    //  create cookie if JWT is valid
    .then(
        (sessionCookie) => {    //  send back the cookie.
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            res.json({success: true});
        },
        (error) => {
            console.log(error)
            res.status(401).json({success: false, error: error.message});
        }
    )
    .catch(err => {
        console.log(err)
    });
});




//  eat the cookie 😈
router.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.json({success: true});
});





module.exports = router;