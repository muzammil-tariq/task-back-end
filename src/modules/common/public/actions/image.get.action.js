exports.getImage = async (req, res, next) => {
  const {
    params: { 0: key },
  } = req;
  try {
    const data = await libs.s3.getObjectSignedUrl({ key });
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUploadSignedUrl = async (req, res, next) => {
  const {
    params: { 0: path },
  } = req;
  try {
    const data = await libs.s3.getUploadSignedUrl({
      path,
    });
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};
