const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./temp/${req.params.uploadId}`);
  },
  filename: function (req, file, cb) {
    const randID = uuid();
    file["name"] = randID;
    const fileName = randID + path.extname(file.originalname);
    cb(null, fileName);
  },
});
// Here, fileSize is in bytes. (1000000 bytes = 1MB)
const limits = 1000000 * 1500;
const upload = multer({ storage, limits }).array("media", 3);

const handleUpload = (req, res, next) => {
  const { uploadId } = req.params;

  // if no directory exists with uploadId in temp, create one
  if (!fs.existsSync(`./temp/${uploadId}`)) {
    fs.mkdirSync(`./temp/${uploadId}`);
  }

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("Something went wrong!");
    }

    const { formatTo } = req.body;

    req.files = (req.files || []).map((file, i) => {
      file["name_ext"] = `${file.destination}/${file.filename}`;
      if (Array.isArray(formatTo)) {
        file["formatTo"] = formatTo[i];
      } else {
        file["formatTo"] = formatTo;
      }
      return file;
    });

    next();
  });
};

module.exports = {
  handleUpload,
};
