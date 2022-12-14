const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const IS_DELETE_ORIGINAL_FILE = true;
let FFMPEG_BINARY_DESTINATION = "./lib/ffmpeg/linux/bin/ffmpeg.exe";

if (process.platform === "win32") {
  FFMPEG_BINARY_DESTINATION = "./lib/ffmpeg/win/bin/ffmpeg";
  ffmpeg.setFfmpegPath(FFMPEG_BINARY_DESTINATION);
}

const timeOuts = [];

const convert = (req, res) => {
  const { uploadId } = req.params;

  const fullDomain = "https" + "://" + req.get("host");

  // set cookie for file count
  const fileCount = req.cookies["MAX_FILE_COUNT"];
  res.cookie("MAX_FILE_COUNT", req.files.length + parseInt(fileCount || 0), {
    domain: req.get("host"),
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // preserve for 1 day
  });
  // set cookie for file count

  res.json({
    message: `Converting ${req.files.length} files`,
    status: "processing",
    upload_id: uploadId,
    ping_url: `${fullDomain}/is-ready/${uploadId}`,
  });

  // if no directory exists with uploadId in temp, create one
  if (!fs.existsSync(`./converted_files/${uploadId}`)) {
    fs.mkdirSync(`./converted_files/${uploadId}`);
  }

  if (req.files?.length) {
    convertTheFile(req.files, 0, uploadId);
  }
  // (req.files || []).forEach((file) => {});
};

const convertTheFile = (files, index, uploadId) => {
  const file = files[index];
  const fileFinalDestination = `./converted_files/${uploadId}/${file.name}.${file.formatTo}`;
  ffmpeg({ source: file.name_ext })
    .toFormat(file.formatTo)
    .on("end", () => {
      console.log("processing done");
      // delete file from temp folder
      if (IS_DELETE_ORIGINAL_FILE) {
        fs.unlink(file.name_ext, (err) => {
          if (!err) {
            console.log("file deleted");
          }
        });
      }
      // if there are more files to convert, convert them
      if (index + 1 < files.length) {
        convertTheFile(files, index + 1, uploadId);
      }

      // remove the file after 2 hours
      // const timer = setTimeout(() => {
      //   fs.unlink(fileFinalDestination, (err) => {
      //     if (!err) {
      //       console.log("file deleted after conversion");
      //     }
      //   });
      // }, 3600000);
      // 2 hours in milliseconds equal to 7200000
      // 1 hour in milliseconds equal to 3600000
      // timeOuts.push(timer);
    })
    .on("error", (error) => {
      console.log(error);
      console.log("some error occured");
    })
    .saveToFile(fileFinalDestination);
};

module.exports = {
  convert,
};
