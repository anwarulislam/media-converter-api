const fs = require("fs");
const express = require("express");
const Router = express.Router();
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "public/" }).single("image");

Router.post("/settings-audio", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }

    // rename the file to Date.now with extension

    const { file } = req;

    saveFile(file, "settings-audio.json");

    res.redirect("/settings-audio");
  });
});

Router.post("/settings-rc", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }

    // rename the file to Date.now with extension

    const { file } = req;

    saveFile(file, "settings-rc.json");

    res.redirect("/settings-rc");
  });
});

const saveFile = (file, jsonFile) => {
  if (file) {
    const { filename, mimetype } = file;
    const extension = mimetype.split("/")[1];
    const newFilename = `${Date.now()}.${extension}`;

    fs.renameSync(
      path.join(__dirname, `../public/${filename}`),
      path.join(__dirname, `../public/${newFilename}`)
    );
  }

  const settings = require("../public/" + jsonFile);
  if (file) {
    settings["promoImage"] = "/public/" + newFilename;
  }
  settings["link"] = req.body.link;
  fs.writeFileSync(
    path.join(__dirname, "../public/" + jsonFile),
    JSON.stringify(settings)
  );
};

Router.get("/settings-audio", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/settings-audio.html"));
});
Router.get("/settings-rc", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/settings-rc.html"));
});

Router.get("/embed", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/embed.html"));
});

module.exports = Router;
