"use strict";
require("dotenv").config();

/**
 * Add packages globally
 */
require("./src/global-package");
/**
 * Add Util globally
 */

require("./src/utils");
/**
 * Add Lib globally
 */
require("./src/libs");

// require('./src/libs');
require("./config/db");
/**
 * Add server setup
 */

require("./src/server");
const fs = require("fs");

let types = {
  models: {},
  middlewares: {},
  services: {},
  utils: {},
  libs: {},
  actions: {},
  validators: {},
};

// SCHEMA
for (let schemaFile of utils.globalFile.getGlobbedFiles("./**/*.schema.js")) {
  const schema = require(path.resolve(`${schemaFile}`));
  schema &&
    (types["models"][schema.modelName] = `typeof import("${schemaFile.replace(
      ".js",
      ""
    )}")`.replace(/'/g, ""));
  // console.log(`${schema.modelName}: typeof import("${schemaFile}")`);
}

// MIDDLEWARES
var middlewaresDir = "/src/middlewares";
fs.readdirSync(__dirname + "/src/middlewares")
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    types.middlewares[
      file.replace(".middleware.js", "")
    ] = `typeof import(".${path.join(
      middlewaresDir,
      file.replace(".js", "")
    )}")`;
  });

// SERVICES
var serivcesDir = "/src/services/";
fs.readdirSync(__dirname + serivcesDir)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    let service = require("./" + path.join(serivcesDir, file));
    // Object.assign(types.services, service);
    types.services[Object.keys(service)[0]] = `typeof import(".${path.join(
      serivcesDir,
      file.replace(".js", "")
    )}").${Object.keys(service)[0]}`;
  });

// UTILS
var utilsDir = "/src/utils";
fs.readdirSync(__dirname + utilsDir)
  .filter((file) => file.indexOf(".") !== 0 && file.indexOf("index.js") === -1)
  .forEach((file) => {
    types.utils[file.replace(".util.js", "")] = `typeof import(".${path.join(
      utilsDir,
      file.replace(".js", "")
    )}")`;
  });

// LIBS
var libsDir = "/src/libs";
fs.readdirSync(__dirname + libsDir)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file.indexOf("index.js") === -1 &&
      file.indexOf("lib.js") > -1
  )
  .forEach((file) => {
    types.libs[file.replace(".lib.js", "")] = `typeof import(".${path.join(
      libsDir,
      file.replace(".js", "")
    )}")`;
  });

// ACTIONS
for (let actionFile of utils.globalFile.getGlobbedFiles("./**/*.action.js")) {
  const filePathArr = actionFile.split("/");
  const moduleName = filePathArr[filePathArr.length - 3];
  const actions = require(path.resolve(`${actionFile}`));
  for (const action in actions) {
    types.actions = {
      ...types.actions,
      [moduleName]: {
        ...types.actions[moduleName],
        [action]: `typeof import("./${path.join(
          actionFile.replace(".js", "")
        )}").${action}`,
      },
    };
  }
}
let files = utils.globalFile.getGlobbedFiles("./**/*.validator.js");
for (let validatorFile of files) {
  const filePathArr = validatorFile.split("/");
  const moduleName = filePathArr[filePathArr.length - 2];
  const validators = require(`${validatorFile}`);
  // let files = utils.globalFile.getGlobbedFiles(
  //   `./**/${moduleName}/*.validator.js`
  // );
  let indexOfCurrentFile = files.findIndex((i) => i === validatorFile);
  let greaterThan1 = files.some((file, index) => {
    return (
      file.includes(`modules/${moduleName}`) && indexOfCurrentFile !== index
    );
  });
  if (greaterThan1) {
    for (const validator in validators) {
      types.validators = {
        ...types.validators,
        [moduleName]: {
          ...types.validators[moduleName],
          [validator]: `typeof import("./${path.join(
            validatorFile.replace(".js", "")
          )}").${validator}`,
        },
      };
    }
  } else {
    types.validators = {
      ...types.validators,
      [moduleName]: `typeof import("./${path.join(
        validatorFile.replace(".js", "")
      )}")`,
    };
  }
}

var text = `
declare global: {
  // MODELS
  var models: ${
    util.inspect(types.models, false, 2, false)
    // .replaceAll("'", "")
    // .replaceAll(",", ";")
  };

  // MiDDLEWARES
  var middlewares: ${util.inspect(types.middlewares, false, 2, false)};

  //SERVICES
  var services: ${util.inspect(types.services, false, 2, false)};

  // UTILS
  var utils: ${util.inspect(types.utils, false, 2, false)};

  // LIBS
  var libs: ${util.inspect(types.libs, false, 2, false)};

  // ACTIONS
  var actions: ${util.inspect(types.actions, false, 2, false)};

  // VALIDATORS
  var validators: ${util.inspect(types.validators, false, 2, false)};

  var messages: typeof import("./config/messages");
  var dataConstraint: typeof import("./config/data_constraints");

  namespace Express {
    interface Request {
      roleModel: Model<Document>;
    }
  }

}

export {};

`;

fs.writeFile("./test.d.ts", text, (err) => {
  if (err) throw err;
  console.log("Generated Types");
});
