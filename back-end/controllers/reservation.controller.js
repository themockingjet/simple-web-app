//
//
//

const Reservation = require("../models/reservation.model");
const {format} = require("date-fns");

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
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};

exports.findReservations = async (req, res) => {
    //
    await Reservation.findReservations((err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};

exports.findReservationById = async (req, res) => {
    //
    await Reservation.findReservationById(req.params.id, (err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};

exports.findReservationByDate = async (req, res) => {
    //
    if (!req.params.date) return res.sendStatus(400);
    const date = req.params.date;

    await Reservation.findReservationByDate(date, (err, result) => {
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
    //
    const id = req.params.id;
    let data = {
        date: new Date(req.body.date),
        time: new Date(req.body.time),
        status: req.body.status,
    };

    data.date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`;
    data.time = `${data.time.getHours().toString().padStart(2, 0)}:${data.time.getMinutes().toString().padStart(2, 0)}`;

    await Reservation.updateReservation(id, data, (err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.sendStatus(200);
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
