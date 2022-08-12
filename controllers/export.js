const { v4: uuid } = require('uuid');
const firebaseAdmin = require("firebase-admin");

const db = firebaseAdmin.firestore();
const sessionDB = db.collection('sessions');

const isReady = async (req, res) => {
    const { uploadId } = req.params;
    console.log(uploadId)
    const data = await sessionDB
        .doc(uploadId)
        .get()

    res.json(data)
}

module.exports = {
    isReady
}