for (let strategy of utils.globalFile.getGlobbedFiles("./**/*.passport.js")) {
  if (strategy.search("google") > -1) {
    require(path.resolve(strategy))("owner-google", "owners");
  } else if (strategy.search("facebook") > -1) {
    require(path.resolve(strategy))("owner-facebook", "owners");
  } else if (strategy.search("twitter") > -1) {
    require(path.resolve(strategy))("owner-twitter", "owners");
  } else {
    require(path.resolve(strategy))();
  }
}
