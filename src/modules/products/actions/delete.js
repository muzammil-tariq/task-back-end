const productSchema = require("../../../schemas/products");
module.exports = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    await productSchema.deleteOne({
      _id: id,
    });
    return res.json({
      data: null,
      status: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
