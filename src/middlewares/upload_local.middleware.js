function uploadSingle(req, res, next) {
  let upload = libs.media_upload.single("image");
  upload(req, res, function (err) {
    try {
      if (err) {
        throw createError(400, err.message);
      }
      next();
    } catch (err) {
      next(err);
    }
  });
}

function uploadMultiple(req, res, next) {
  const {
    query: { attachmentsLimit = dataConstraint.attachmentsLimit },
  } = req;

  let upload = libs.media_upload.array("images", attachmentsLimit);
  upload(req, res, function (err) {
    try {
      if (err instanceof multer.MulterError) {
        throw createError(
          400,
          err.code === dataConstraint.MULTER_LIMIT_CODE
            ? messages.filesLengthExceeded
            : err.message
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = {
  uploadSingle,
  uploadMultiple,
};
