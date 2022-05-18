"use strict";
global.helpers = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    global.helpers[file.replace(".helper.js", "")] = require(path.resolve(
      __dirname,
      file
    ));
  });
