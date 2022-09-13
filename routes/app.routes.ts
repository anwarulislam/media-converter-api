const express = require("express");
const Router = express.Router();
const path = require("path");
const { convert } = require("../controllers/convert");
const { isReady, download } = require("../controllers/export");
const { create } = require("../controllers/import");
const { checkLimit } = require("../middlewares/checkLimit");
const { handleUpload } = require("../middlewares/upload");

Router.post("/settings", (req, res) => {
  // sent default json settings
  res.json({
    bannerImage: "https://i.imgur.com/6xZx0X9.png",
  });
});

module.exports = Router;
