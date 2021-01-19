"use strict";
module.exports = {};
global.libs = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    module.exports[file.replace(".lib.js", "")] = require(path.resolve(
      __dirname,
      file
    ));
    global.libs[file.replace(".lib.js", "")] = require(path.resolve(
      __dirname,
      file
    ));
  });

module.exports.default = module.exports;
