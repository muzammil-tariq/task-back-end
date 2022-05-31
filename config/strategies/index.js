for (let strategy of utils.globalFile.getGlobbedFiles("./**/*.passport.js")) {
  if (strategy.search("local") > -1) {
    require(path.resolve(strategy))("local");
  } else if (strategy.search("jwt") > -1) {
    require(path.resolve(strategy))("jwt");
  }
}
