for (let strategy of utils.globalFile.getGlobbedFiles("./**/*.passport.js")) {
  if (strategy.search("google") > -1) {
    require(path.resolve(strategy))("google");
  } else if (strategy.search("facebook") > -1) {
    require(path.resolve(strategy))("facebook");
  } else if (strategy.search("twitter") > -1) {
    require(path.resolve(strategy))("twitter");
  } else {
    require(path.resolve(strategy))();
  }
}
