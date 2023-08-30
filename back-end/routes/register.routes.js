//
//
//

const express = require("express");
const route = express.Router();
const UserController = require("../controllers/user.controller");

route.post("/", UserController.createUser);
route.post("/check/:email", UserController.findUserByEmail);

module.exports = route;
