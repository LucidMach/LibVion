const admin = require('../services/firebase');


module.exports = (req, res, next) => {
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then((user) => {
            //  using this, you will have user data in your hand on all authenticated requests.
            req.user = user;
            next();
        })
        .catch(_ => {
            // Session cookie is unavailable or invalid. Force user to login.
            res.status(401).json({success: false, error: 'cookie not valid or missing. Try logging again!'});
        });
}