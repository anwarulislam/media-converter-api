const express = require("express");
const Router = express.Router();
const path = require("path");
const { convert } = require("../controllers/convert");
const { isReady, download } = require("../controllers/export");
const { create } = require("../controllers/import");
const { handleUpload } = require("../middlewares/upload");

Router.get("/is-ready/:uploadId", isReady);
Router.post("/upload", create);

Router.get("/upload", (req, res) => {
  // server index.html file from views/index.html
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

Router.get("/convert", (req, res) => {
  // redirect to upload page
  res.redirect("/upload");
});

Router.post("/convert", handleUpload, convert);

Router.get("/download/:base64Id", download);

module.exports = Router;
