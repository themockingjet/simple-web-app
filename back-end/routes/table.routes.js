//
//
//

const express = require("express");
const route = express.Router();
const TableController = require("../controllers/table.controller");

route.get("/reservations", TableController.findTableReservations);
route.get("/accounts", TableController.findTableAccounts);
route.get("/users", TableController.findTableUsers);

module.exports = route;
