var admin = require("firebase-admin");
require('dotenv').config();

var serviceAccount = require(process.env.CRED_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;