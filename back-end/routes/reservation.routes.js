//
//
//

const express = require("express");
const route = express.Router();
const ReservationController = require("../controllers/reservation.controller");

route.get("/", ReservationController.findReservations);
route.post("/", ReservationController.createReservation);

route.get("/:id", ReservationController.findReservationById);
route.post("/:id", ReservationController.updateReservation);

route.get("/date/:date", ReservationController.findReservationByDate);

route.get("/range/:start/:end", ReservationController.findReservationByRange);

route.get("/status/:status", ReservationController.findReservationByStatus);
route.post("/status/:id", ReservationController.updateReservationStatus);

module.exports = route;
