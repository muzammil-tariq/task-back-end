const categories = require("../../../schemas/category");
module.exports = async (req, res, next) => {
  try {
    const data = await categories.find();
    return res.json({
      data,
      status: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
