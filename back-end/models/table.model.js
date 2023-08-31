//
//
//

const db = require("../config/db_config");

exports.findTableReservations = async (data, callback) => {
    //
    await db.query(
        `SELECT a.id, b.first_name, b.last_name, c.email, b.contact_no, a.date, a.time, a.status
        FROM reservations a
        LEFT JOIN users b
        ON b.id = a.user_id
        LEFT JOIN accounts c
        ON c.id = b.account_id
        WHERE b.first_name LIKE ? OR b.last_name LIKE ? OR b.contact_no LIKE ? OR a.date LIKE ? OR a.time LIKE ? OR a.status LIKE ?
        ORDER BY a.date DESC, a.time ASC;`,
        [data, data, data, data, data, data],
        (error, result) => {
            //
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );
};

exports.findTableUsers = async (callback) => {
    //
    await db.query(
        `SELECT a.id, a.first_name, a.last_name, a.birthday, a.contact_no, a.account_id, b.email FROM users a LEFT JOIN accounts b ON b.id = a.account_id;`,
        (error, result) => {
            //
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );
};

exports.findTableAccounts = async (callback) => {
    //
    await db.query(`SELECT id, email, is_admin, created_at FROM accounts;`, (error, result) => {
        //
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};
