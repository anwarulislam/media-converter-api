const { v4: uuid } = require('uuid');
const firebaseAdmin = require("firebase-admin");

const db = firebaseAdmin.firestore();
const sessionDB = db.collection('sessions');

const create = async (req, res) => {
    const uploadId = uuid()
    const payload = {
        uploadId,
        name: 'wow',
        description: 'wow'
    }

    await sessionDB
        .doc(uploadId)
        .set(payload)

    res.json(payload)
}

module.exports = {
    create
}