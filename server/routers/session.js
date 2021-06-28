const router = require('express').Router();
const admin = require('../services/firebase.js')



//  just intro
router.get('/', (req, res) => {
    res.send('signup, login or logout!');
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
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        )
        .catch(err => {
            console.log(err)
        })
});




//  eat the cookie 😈
router.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.json({success: true});
});





module.exports = router;