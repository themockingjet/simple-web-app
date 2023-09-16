//
//
//

const db = require("../config/db_config");

exports.createUser = async (data, callback) => {
	db.query(
		`INSERT INTO accounts SET email = ?, password = ?, created_at = NOW(), updated_at = NOW(); INSERT INTO users SET first_name = ?, last_name = ?, account_id = (SELECT id FROM accounts WHERE email=?), contact_no = ?, created_at = NOW(), updated_at = NOW();`,
		[data.email, data.password, data.first_name, data.last_name, data.email, data.contact_no],
		(error, result) => {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		}
	);
};

exports.findUsers = async (callback) => {
	db.query("SELECT * FROM users", (error, result) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.findUserById = async (id, callback) => {
	db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.findUserByEmail = async (email, callback) => {
	db.query("SELECT id, email, password, is_admin FROM accounts WHERE email = ?", [email], (error, result) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.updateUser = async (id, data, callback) => {
	//
	db.query("UPDATE users SET ?, updated_at = NOW() WHERE id = ?", [data, id], (error, result) => {
		//
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.deleteUser = async (id, callback) => {
	db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};
