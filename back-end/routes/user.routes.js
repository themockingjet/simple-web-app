//
//
//

const express = require("express");
const route = express.Router();
const UserController = require("../controllers/user.controller");

route.get("/", UserController.findUsers);

route.get("/:id", UserController.findUserById);
route.post("/:id", UserController.updateUser);

module.exports = route;
