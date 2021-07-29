const admin = require("firebase-admin");
const serviceAccount = require("./permission.json");

// require("dotenv").config({path: __dirname + "/./../.env"});

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const firebase = admin;

module.exports =  firebase  