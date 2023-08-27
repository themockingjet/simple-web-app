//
//
//

const db = require("../config/db_config");

exports.createReservation = async (data, callback) => {
    await db.query("INSERT INTO reservations SET ?", [data], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.findReservations = async (callback) => {
    await db.query("SELECT * FROM reservations", (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.findReservationById = async (id, callback) => {
    await db.query("SELECT * FROM reservations WHERE id = ?", [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.updateReservation = async (id, data, callback) => {
    await db.query("UPDATE reservations SET ? WHERE id = ?", [data, id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.updateReservationStatus = async (id, data, callback) => {
    await db.query("UPDATE reservations SET status = ?, updated_at = NOW() WHERE id = ?", [data, id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};
