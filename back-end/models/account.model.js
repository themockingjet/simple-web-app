//
//
//

const db = require("../config/db_config");

exports.findAccountById = async (id, callback) => {
    await db.query("SELECT * FROM accounts WHERE id = ?", [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.findAccountByEmail = async (email, callback) => {
    await db.query("SELECT id, email, password, is_admin FROM accounts WHERE email = ?", [email], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.verifyToken = async (token, callback) => {
    await db.query("SELECT id, email FROM accounts WHERE token = ?", [token], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.updateAccount = async (id, data, callback) => {
    //
    await db.query("UPDATE accounts SET ?, updated_at = NOW() WHERE id = ?", [data, id], (error, result) => {
        console.log(error);
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.updateAccountRole = async (id, data, callback) => {
    //
    await db.query("UPDATE accounts SET is_admin = ?, updated_at = NOW() WHERE id = ?", [data, id], (error, result) => {
        console.log(error);
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};
