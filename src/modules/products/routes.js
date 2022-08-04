const express = require("express");
const router = express.Router();
const get = require("./actions/get");
const deleteAction = require("./actions/delete");
router.get("/", get);
router.get("/", get);
router.delete("/:id", deleteAction);
module.exports = router;
