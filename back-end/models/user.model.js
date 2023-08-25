//
//
//

const db = require("../config/db_config");

exports.findUsers = async (callback) => {
    await db.query("SELECT * FROM users", (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.findUserById = async (id, callback) => {
    await db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.findUserByEmail = async (email, callback) => {
    await db.query("SELECT id, email, password FROM accounts WHERE email = ?", [email], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.createUser = async (data, callback) => {
    await db.query(
        `INSERT INTO accounts SET email = ?, password = ?, created_at = NOW(), updated_at = NOW(); INSERT INTO users SET first_name = ?, last_name = ?, account_id = (SELECT id FROM accounts WHERE email=?), created_at = NOW(), updated_at = NOW();`,
        [data.email, data.password, data.first_name, data.last_name, data.email],
        (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );
};

exports.updateUser = async (id, data, callback) => {
    await db.query("UPDATE users SET ? WHERE id = ?", [data, id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.deleteUser = async (id, callback) => {
    await db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};
