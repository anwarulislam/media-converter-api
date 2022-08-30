const MAX_FILE_SIZE = 15 * 1024 * 1024; // 500MB
const MAX_FILE_COUNT = 3;

const checkLimit = (req, res, next) => {
  // get cookie from request
  const cookies = req.cookies;

  //   get MAX_FILE_COUNT from cookies
  const fileCount = cookies["MAX_FILE_COUNT"];
  console.log(fileCount);

  next();
};

module.exports = {
  checkLimit,
};
