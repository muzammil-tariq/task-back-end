(async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    mongoose.set("debug", true);
    console.log("💿 Connected to database: " + process.env.NODE_ENV);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
