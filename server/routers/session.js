const router = require('express').Router();
const admin = require('../services/firebase.js')



//  just intro
router.get('/', (req, res) => {
    res.send('login or logout!');
});



router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const phoneNumber = req.body.phoneNumber;

    //  validations for password, username etc....
    /* will do it later. */

    //  remove or add fields for signup, your wish!
    await admin
    .auth()
    .createUser({
        email,
        emailVerified: false,
        password,
        displayName,
        phoneNumber,
        disabled: false,
    })
    .then((user) => {
        console.log('Successfully created new user:', user.uid);
        res.json({success: true});
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
            res.status(401).json({success: false, error});
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