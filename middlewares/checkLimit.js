const MAX_FILE_SIZE = 15 * 1024 * 1024; // 500MB
const MAX_FILE_COUNT = 0;

const checkLimit = (req, res, next) => {
  // get MAX_FILE_COUNT from cookies
  const fileCountInCookie = req.cookies["MAX_FILE_COUNT"] || 0;

  let totalFiles = Number(req.body.totalFiles || 0) + Number(fileCountInCookie);
  totalFiles = totalFiles === NaN ? 0 : totalFiles;

  if (totalFiles >= MAX_FILE_COUNT) {
    return res.status(400).json({
      message: "You have reached the limit of files",
    });
  }

  req["converted_length"] = totalFiles;

  next();
};

module.exports = {
  checkLimit,
};
