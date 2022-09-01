const MAX_FILE_SIZE = 15 * 1024 * 1024; // 500MB
const MAX_FILE_COUNT = 30;

const checkLimit = (req, res, next) => {
  // get MAX_FILE_COUNT from cookies
  const fileCount = req.cookies["MAX_FILE_COUNT"];

  console.log("checkLimit", fileCount);

  if ((fileCount || 0) >= MAX_FILE_COUNT) {
    return res.status(400).json({
      message: "You have reached the limit of files",
    });
  }

  req["converted_length"] = fileCount;

  next();
};

module.exports = {
  checkLimit,
};
