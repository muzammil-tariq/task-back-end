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
global.cors = require("cors");
global.sgMail = require("@sendgrid/mail");
global.fs = require("fs");
global.expressValidator = require("express-validator");
global.util = require("util");
global.axios = require("axios").default;
global.multer = require("multer");
global.redis = require("redis");
global.redisClient = redis.createClient(process.env.REDIS_URL);
