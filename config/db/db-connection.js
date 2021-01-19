(async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV != "test-case"
        ? process.env.MONGO_URL
        : process.env.MONGO_TEST_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connected to  database") + process.env.NODE_ENV;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
