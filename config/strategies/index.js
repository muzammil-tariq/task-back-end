for (let strategy of utils.globalFile.getGlobbedFiles("./**/*.passport.js")) {
  if (strategy.search("google") > -1) {
    require(path.resolve(strategy))("google");
    require(path.resolve(strategy))("customer-google", "customers");
    require(path.resolve(strategy))("vendor-google", "vendors");
  } else if (strategy.search("facebook") > -1) {
    require(path.resolve(strategy))("facebook");
    require(path.resolve(strategy))("customer-facebook", "customers");
    require(path.resolve(strategy))("vendor-facebook", "vendors");
  } else if (strategy.search("twitter") > -1) {
    require(path.resolve(strategy))("twitter");
  } else {
    require(path.resolve(strategy))();
  }
}
