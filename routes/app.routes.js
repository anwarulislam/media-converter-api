const fs = require("fs");
const express = require("express");
const Router = express.Router();
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "public/" }).single("image");

Router.post("/settings", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }

    // rename the file to Date.now with extension

    const { file } = req;
    const { filename, mimetype } = file;
    const extension = mimetype.split("/")[1];
    const newFilename = `${Date.now()}.${extension}`;

    fs.renameSync(
      path.join(__dirname, `../public/${filename}`),
      path.join(__dirname, `../public/${newFilename}`)
    );

    // change /public/settings.json

    const settings = require("../public/settings.json");
    settings["promoImage"] = "/public/" + newFilename;
    settings["link"] = req.body.link;
    fs.writeFileSync(
      path.join(__dirname, "../public/settings.json"),
      JSON.stringify(settings)
    );

    // redirect to url /settings
    res.redirect("/settings");
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
    const { filename, mimetype } = file;
    const extension = mimetype.split("/")[1];
    const newFilename = `${Date.now()}.${extension}`;

    fs.renameSync(
      path.join(__dirname, `../public/${filename}`),
      path.join(__dirname, `../public/${newFilename}`)
    );

    // change /public/settings.json

    const settings = require("../public/settings.json");
    settings["promoImage"] = "/public/" + newFilename;
    settings["link"] = req.body.link;
    fs.writeFileSync(
      path.join(__dirname, "../public/settings.json"),
      JSON.stringify(settings)
    );

    // redirect to url /settings
    res.redirect("/settings");
  });
});

Router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/settings.html"));
});
Router.get("/settings-rc", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/settings-rc.html"));
});

Router.get("/embed", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/embed.html"));
});

module.exports = Router;
