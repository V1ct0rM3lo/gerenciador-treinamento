const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceKey.json"); // Certifique-se de que esse arquivo existe!

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db; // Exportando Firestore corretamente
