"use strict";
module.exports = {};
global.utils = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    module.exports[file.replace(".util.js", "")] = require(path.resolve(
      __dirname,
      file
    ));
    global.utils[file.replace(".util.js", "")] = require(path.resolve(
      __dirname,
      file
    ));
  });

module.exports.default = module.exports;
