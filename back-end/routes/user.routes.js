//
//
//

const express = require("express");
const route = express.Router();
const UserController = require("../controllers/user.controller");

route.get("/test", (req, res) => {
    res.status(200).send({ message: "Success!" });
});

module.exports = route;
