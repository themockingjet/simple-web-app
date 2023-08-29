//
//
//

const Reservation = require("../models/reservation.model");

exports.createReservation = async (req, res) => {
    //
    let data = {
        id: req.body.id,
        date: new Date(req.body.date),
        time: new Date(req.body.time),
    };

    data.date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`;
    data.time = `${data.time.getHours().toString().padStart(2, 0)}:${data.time.getMinutes().toString().padStart(2, 0)}`;

    await Reservation.createReservation(data, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

exports.getReservations = async (req, res) => {
    await Reservation.getReservations((err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).send(result);
        }
    });
};

exports.findReservationById = async (req, res) => {
    await Reservation.findReservationById(req.params.id, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).send(result);
        }
    });
};

exports.findReservationByDate = async (req, res) => {
    //
    if (!req.params.date) return res.sendStatus(400);

    const date = new Date(req.params.date);
    const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    await Reservation.findReservationByDate(dateFormat, (err, result) => {
        //
        if (err) return res.sendStatus(500);
        if (result.length === 0) return res.sendStatus(404);

        result.map((data) => {
            const time = parseInt(data.time);
            data.time = time;
        });
        res.status(200).send(result);
    });
};

exports.findReservationByRange = async (req, res) => {
    //
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);

    let schedule = {};

    if (start && end) {
        //
        Reservation.findReservationByRange(start, end, (err, result) => {
            //
            if (err) return res.sendStatus(500);

            result.map((item) => {
                const date = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`;

                if (!schedule[date]) {
                    schedule[date] = new Array();
                }

                schedule[date].push(item.time);
            });
            res.status(200).send(schedule);
        });
    }
};

exports.updateReservation = async (req, res) => {
    await Reservation.updateReservation(req.params.id, req.body, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

exports.updateReservationStatus = async (req, res) => {
    await Reservation.updateReservationStatus(req.params.id, req.body, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};
