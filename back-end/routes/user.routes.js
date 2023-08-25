//
//
//

const express = require("express");
const route = express.Router();
const UserController = require("../controllers/user.controller");

route.post("/create", UserController.createUser);
route.post("/:email", UserController.findUserByEmail);

module.exports = route;
