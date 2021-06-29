const admins = require('./adminList');

module.exports = (req, res, next) => {
    admins.every(admin => {
        if (admin == req.user.uid) {
            req.admin = true;
            return false;
        }
        else {
            req.admin = false
            return true;
        }
    });

    if(req.admin)
        next();
    else
        res.status(403).json({success: false, errro: 'current user is not admin'});
    
}