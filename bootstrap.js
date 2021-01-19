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
/**
 * Add Schemas globally
 */
require("./config/db");
/**
 * Add server setup
 */

require("./src/server");
/**
 *  start server
 */

require("./bin/www");
/**
 * Generate types for globals
 */
// if (process.env.NODE_ENV != "production") {
//   require("./generate-types");
// }
