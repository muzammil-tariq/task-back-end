const express = require("express");
global.app = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(logger("dev"));
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const createError = require("http-errors");

var session = require("express-session");
app.use(session({ secret: "SECRET", resave: false, saveUninitialized: false }));
app.use(cors());
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    mongoose.set("debug", true);
    console.log("💿 Connected to database: ");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
// const brand = [{ name: "rebook" }, { name: "nike" }];
const brandSchema = require("./schemas/brand");
// (async () => {
//   for (var i = 0; i < brand.length; i++) {
//     const prev = await brandSchema.findOne({ name: brand[i].name });
//     !prev && (await brandSchema.create(brand[i]));
//   }
// })();
// const categories = [{ name: "shoes" }];
const categorySchema = require("./schemas/category");
// (async () => {
//   for (var i = 0; i < categories.length; i++) {
//     const prev = await shoesSchema.findOne({ name: categories[i].name });
//     !prev && (await shoesSchema.create(brand[i]));
//   }
// })();
app.get("/", (req, res, next) => {
  return res.json({
    status: 200,
    message: "success",
  });
});
const productsModules = require("./modules/products/routes");
const brandModule = require("./modules/brand/routes");
const categoryModules = require("./modules/category/routes");
app.use("/products", productsModules);
app.use("/brands", brandModule);
app.use("/categories", categoryModules);

const products = [
  {
    name: "Product 1",
    image: "use any image",
    category: "shoes",
    bran: "rebook",
    size: "large",
    price: 1000,
    year: 2020,
  },
  {
    name: "Product 2",
    image: "use any image",
    category: "shoes",
    brand: "nike",
    size: "medium",
    price: 1000,
    year: 2020,
  },
  {
    name: "Product 3",
    image: "use any image",
    category: "shoes",
    brand: "nike",
    size: "large",
    price: 1000,
    year: 2020,
  },
  {
    name: "Product 4",
    image: "use any image",
    category: "shoes",
    brand: "rebook",
    size: "small",
    price: 1000,
    year: 2020,
  },
  {
    name: "Product 5",
    image: "use any image",
    category: "shoes",
    brand: "rebook",
    size: "large",
    price: 1000,
    year: 2020,
  },
];
const productsSchema = require("./schemas/products");
const addProducts = async () => {
  for (var i = 0; i < products.length; i++) {
    const prevProduct = await productsSchema.findOne({
      name: products[i].name,
    });
    if (!prevProduct) {
      let brand;
      let category;
      brand = await brandSchema.findOne({ name: products[i].brand });
      !brand && (brand = await brandSchema.create({ name: products[i].brand }));
      category = await categorySchema.findOne({ name: products[i].category });
      !category &&
        (category = await categorySchema.create({
          name: products[i].category,
        }));
      await productsSchema.create({
        year: products[i].year,
        name: products[i].name,
        price: products[i].price,
        size: products[i].size,
        brand: brand._id,
        category: category._id,
      });
    }
  }
};
addProducts();
app.post("/initilize", addProducts);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log({ err });
  res
    .status(err.status || 500)
    .send({ status: err.status, message: err.message, data: {} });
  // res.json({ status: err.status || 500, message: err.message });
});
