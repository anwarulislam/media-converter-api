const { v4: uuid } = require("uuid");
const findRemoveSync = require("find-remove");
// const firebaseAdmin = require("firebase-admin");

// const db = firebaseAdmin.firestore();
// const sessionDB = db.collection("sessions");

const create = async (req, res) => {
  const olderConvertedFiles = findRemoveSync("./converted_files", {
    dir: "*",
    files: "*.*",
    age: { seconds: 3600 * 2 },
  });
  const olderTempFiles = findRemoveSync("./temp", {
    dir: "*",
    files: "*.*",
    age: { seconds: 3600 * 2 },
  });

  console.log(olderTempFiles, olderConvertedFiles);

  return res.json({
    id: uuid(),
  });
  const uploadId = uuid();
  const payload = {
    uploadId,
    name: "wow",
    description: "wow",
  };

  await sessionDB.doc(uploadId).set(payload);

  res.json(payload);
};

module.exports = {
  create,
};
