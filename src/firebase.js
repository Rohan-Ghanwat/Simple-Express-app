const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://express-firebase-app-ddaa3.firebaseio.com'
});

const db = admin.firestore();
module.exports = db;
