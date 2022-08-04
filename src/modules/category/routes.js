const express = require("express");
const router = express.Router();
const get = require("./actions/get");
router.get("/", get);
module.exports = router;
