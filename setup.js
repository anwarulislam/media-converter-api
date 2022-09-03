const fs = require("fs");

const setup = async () => {
  /* if temp directory not exist create one */
  if (!fs.existsSync("./temp")) {
    fs.mkdirSync("./temp");
  }
  if (!fs.existsSync("./converted_files")) {
    fs.mkdirSync("./converted_files");
  }
};

module.exports = setup;
