const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
// const firebaseAdmin = require("firebase-admin");

// const db = firebaseAdmin.firestore();
// const sessionDB = db.collection('sessions');

const isReady = async (req, res) => {
  const { uploadId } = req.params;
  console.log(uploadId);
  const relativePath = `converted_files/${uploadId}`;

  if (fs.existsSync(relativePath)) {
    const fullDomain = req.protocol + "://" + req.get("host");
    console.log(fullDomain);
    const encodedId = Buffer.from(uploadId).toString("base64");
    res.json({
      message: "Download",
      status: "ready",
      download_url: `${fullDomain}/download/${encodedId}`,
    });
  } else {
    res.json({
      message: "No file exists",
      status: "processing",
    });
  }

  //   console.log(uploadId);
  //   const data = await sessionDB.doc(uploadId).get();
  //   res.json(data);
};

const download = async (req, res) => {
  const { base64Id } = req.params;
  // decode base64Id
  const uploadId = Buffer.from(base64Id, "base64").toString("ascii");
  const relativePath = `./converted_files/${uploadId}`;

  // stream
  const file = fs.createReadStream(relativePath);
  res.setHeader("Content-disposition", `attachment; filename=${uploadId}`);
  file.pipe(res);
};

module.exports = {
  isReady,
  download,
};
