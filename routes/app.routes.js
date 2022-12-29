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

    const jsonFile = "settings-audio.json";
    let newFilename = "";

    const { file } = req;

    if (file) {
      const { filename, mimetype } = file;
      const extension = mimetype.split("/")[1];
      newFilename = `${Date.now()}.${extension}`;
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

    res.redirect("/settings/audio");
  });
});

Router.post("/settings-rc", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }

    const jsonFile = "settings-rc.json";
    let newFilename = "";

    const { file } = req;

    if (file) {
      const { filename, mimetype } = file;
      const extension = mimetype.split("/")[1];
      newFilename = `${Date.now()}.${extension}`;
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

    res.redirect("/settings/rc");
  });
});

Router.post("/settings-bg", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }

    const jsonFile = "settings-bg.json";
    let newFilename = "";

    const { file } = req;

    if (file) {
      const { filename, mimetype } = file;
      const extension = mimetype.split("/")[1];
      newFilename = `${Date.now()}.${extension}`;
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

    res.redirect("/settings/bg");
  });
});

Router.get("/settings/:id", (req, res) => {
  const { id } = req.params;
  if (!fs.existsSync(path.join(__dirname, `../views/settings-${id}.html`))) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, `../views/settings-${id}.html`));
});

Router.get("/embed", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/embed.html"));
});

module.exports = Router;
