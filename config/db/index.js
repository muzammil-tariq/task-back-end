require("./db-connection");

/**
 *  Initailize all schema
 */
global["models"] = {};
for (let schemaFile of utils.globalFile.getGlobbedFiles("./**/*.schema.js")) {
  const schema = require(path.resolve(`${schemaFile}`));
  schema && (global["models"][schema.modelName] = schema);
}
