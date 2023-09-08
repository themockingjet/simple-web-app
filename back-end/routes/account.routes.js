//
//
//

const express = require("express");
const route = express.Router();
const AccountController = require("../controllers/account.controller");

route.post("/", AccountController.updateAccount);
route.post("/role/:id", AccountController.updateAccountRole);

module.exports = route;
