function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const base = path.resolve(".");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = base + "/public";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(dir + "/images");
    }
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, makeid(6) + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
      // throw createError(400, "please upload image file");
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
