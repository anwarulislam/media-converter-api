const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const archiver = require("archiver");
// const firebaseAdmin = require("firebase-admin");

// const db = firebaseAdmin.firestore();
// const sessionDB = db.collection('sessions');

const isReady = async (req, res) => {
  const { uploadId } = req.params;
  console.log(uploadId);
  const filesPath = `converted_files/${uploadId}`;

  if (fs.existsSync(filesPath)) {
    const fullDomain = req.protocol + "://" + req.get("host");
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
  const filesPath = `./converted_files/${uploadId}`;

  // if only one file in the directory, download that file
  // else download the directory as zip
  const files = fs.readdirSync(filesPath);
  if (files.length === 1) {
    const firstFile = files[0];
    const filePath = path.join(filesPath, firstFile);
    // stream
    const file = fs.createReadStream(filePath);
    res.setHeader("Content-disposition", `attachment; filename=${firstFile}`);
    file.pipe(res);
  } else {
    const zipFileName = `${uploadId}.zip`;
    const zipFilePath = path.join(filesPath, zipFileName);

    const archive = archiver("zip");

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(filesPath, false);

    archive.on("error", function (err) {
      res.json({
        status: "error",
        message: "Error while zipping",
        error: err,
      });
    });

    const output = fs.createWriteStream(zipFilePath);
    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");

      const file = fs.createReadStream(zipFilePath);
      res.setHeader(
        "Content-disposition",
        `attachment; filename=${zipFileName}`
      );
      file.pipe(res);
    });

    archive.pipe(output);

    archive.finalize();
  }
};

module.exports = {
  isReady,
  download,
};
