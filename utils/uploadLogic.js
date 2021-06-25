const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const rePattern = new RegExp(/\.(jpg|jpeg|png|webp|gif)$/gim);
    try {
      if (file.originalname.match(rePattern)) {
        console.log(`File ending is valid: ${path.extname(file.originalname)}`);
        cb(null, true);
      } else {
        console.log(`File ending invalid: ${path.extname(file.originalname)}`);
        cb(null, false);
      }
    } catch (e) {
      cb(new Error("Error when trying to filter file endings!"));
    }
  },
});

module.exports = upload;
