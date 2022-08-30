const path = require('path');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp');
    },
    filename: function (req, file, cb) {
        const randID = uuid();
        req["fileName"] = randID
        const fileName = randID + path.extname(file.originalname);
        cb(null, fileName);
    }
})
// Here, fileSize is in bytes. (1000000 bytes = 1MB)
const limits = 1000000 * 100;
const upload = multer({ storage, limits }).single("media");


const handleUpload = (req, res, next) => {

    console.log("handleUpload");

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send("Something went wrong!");
        }
        console.log(req.fileName)
        req["fileDestination"] = `${req.file.destination}/${req.file.filename}`;
        next()
    });
}

module.exports = {
    handleUpload
}