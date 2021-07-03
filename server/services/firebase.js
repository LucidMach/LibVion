var admin = require("firebase-admin");
require('dotenv').config();

var serviceAccount = require('../service-account-creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;