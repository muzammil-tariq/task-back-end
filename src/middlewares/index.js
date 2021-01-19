"use strict";
module.exports = {};
global.middlewares = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    global.middlewares[
      file.replace(".middleware.js", "")
    ] = require(path.resolve(__dirname, file));
  });

module.exports.default = module.exports;
