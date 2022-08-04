const brandSchema = require("../../../schemas/brand");
module.exports = async (req, res, next) => {
  try {
    const data = await brandSchema.find();
    return res.json({
      data,
      status: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
