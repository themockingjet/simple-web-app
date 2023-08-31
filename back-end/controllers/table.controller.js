//
//
//

const Table = require("../models/table.model");

exports.findTableReservations = async (req, res) => {
    //
    const search = `%${req.query.search}%`;
    await Table.findTableReservations(search, (err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};

exports.findTableUsers = async (req, res) => {
    //
    await Table.findTableUsers((err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};

exports.findTableAccounts = async (req, res) => {
    //
    await Table.findTableAccounts((err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};
