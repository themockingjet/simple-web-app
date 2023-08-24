//
//
//

const db = require("./config/db_config");

export const findUsers = async (callback) => {
    await db.query("SELECT * FROM users", (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

export const findUserById = async (id, callback) => {
    await db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

export const findUserByEmail = async (email, callback) => {
    await db.query("SELECT * FROM users WHERE email = ?", [email], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

export const createUser = async (data, callback) => {
    await db.query("INSERT INTO users SET ?", [data], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

export const updateUser = async (id, data, callback) => {
    await db.query("UPDATE users SET ? WHERE id = ?", [data, id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

export const deleteUser = async (id, callback) => {
    await db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};
