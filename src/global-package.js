/**
 * Add packages globally
 */
global.express = require("express");
global.app = express();
global.router = express.Router();
global.createError = require("http-errors");
global.cookieParser = require("cookie-parser");
global.logger = require("morgan");
global._ = require("lodash");
global.glob = require("glob");
global.path = require("path");
global.fs = require("fs");
global.passport = require("passport");
global.passportLocal = require("passport-local");
global.passportJWT = require("passport-jwt");
global.mongoose = require("mongoose");
global.crypto = require("crypto");
global.JWT = require("jsonwebtoken");
global.bodyParser = require("body-parser");
// global.swaggerJsdoc = require("swagger-jsdoc");
// global.swaggerUi = require("swagger-ui-express");
global.cors = require("cors");
// global.params = require("params");
// global.phoneNumberLibrary = require("google-libphonenumber");
// global.twilio = require("twilio");
global.sgMail = require("@sendgrid/mail");
global.fs = require("fs");
global.expressValidator = require("express-validator");
global.util = require("util");
global.axios = require("axios").default;
