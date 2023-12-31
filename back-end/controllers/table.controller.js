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
    const search = `%${req.query.search}%`;
    await Table.findTableUsers(search, (err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};

exports.findTableAccounts = async (req, res) => {
    //
    let search = `%${req.query.search}%`;
    if (req.query.search.match(/admin/gi)) {
        search = `1`;
    } else if (req.query.search.match(/user/gi)) {
        search = `0`;
    }
    await Table.findTableAccounts(search, (err, result) => {
        //
        if (err) return res.sendStatus(500);

        res.status(200).send(result);
    });
};
