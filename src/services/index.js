"use strict";
module.exports = {};
global.services = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    let service = require(path.resolve(__dirname, file));
    Object.assign(global.services, service);
  });

module.exports.default = module.exports;
