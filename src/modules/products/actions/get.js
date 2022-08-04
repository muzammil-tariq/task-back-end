const productSchema = require("../../../schemas/products");
const categorySchema = require("../../../schemas/category");
const brandsSchema = require("../../../schemas/brand");
module.exports = async (req, res, next) => {
  try {
    const {
      query: { categories = "[]", brands = "[]", text = "" },
    } = req;
    const categoriesData = await categorySchema
      .find({
        name: {
          $in: JSON.parse(categories),
        },
      })
      .select("_id");
    const brandsData = await brandsSchema
      .find({
        name: {
          $in: JSON.parse(brands),
        },
      })
      .select("_id");
    const _where = {};
    categoriesData?.length &&
      (_where.category = {
        $in: categoriesData.map((item) => item._id),
      });
    brandsData?.length &&
      (_where.brand = {
        $in: brandsData.map((item) => item._id),
      });
    const data = await productSchema
      .find({
        name: {
          $regex: text,
          $options: "i",
        },
        ..._where,
      })
      .populate({
        path: "category",
      })
      .populate({
        path: "brand",
      });
    return res.json({
      data,
      status: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
