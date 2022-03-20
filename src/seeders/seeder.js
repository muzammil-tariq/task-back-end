"use strict";

require("dotenv").config();
/**
 * Add packages globally
 */
require("../../src/global-package");

/**
 * Add Util globally
 */

require("../../src/utils");
/**
 * Add Lib globally
 */

require("../../src/libs");
require("../../config/db");
/**
 * Add server setup
 */

require("../../src/server");
/**
 *  start server
 */

require("../../bin/www");

const obj = {
  email: "admin@example.com",
  password: "admin123",
};

async function addAdmin(obj) {
  const isAlreadyExist = await models.Admin.findOne({ email: obj.email });
  if (!isAlreadyExist) {
    const admin = await models.Admin.create(obj);
    console.log(admin);
  } else {
    console.log("Admin Already Added!");
  }
}

addAdmin(obj);
