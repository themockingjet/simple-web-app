//
//
//

const db = require("../config/db_config");

exports.createReservation = async (data, callback) => {
	//
	db.query(
		"INSERT INTO reservations SET user_id = (SELECT id FROM users WHERE account_id = ?), date = ?, time = ?, created_at = NOW(), updated_at = NOW();",
		[data.id, data.date, data.time],
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

exports.findReservations = async (callback) => {
	//
	db.query("SELECT * FROM reservations", (error, result) => {
		//
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.findReservationById = async (id, callback) => {
	db.query("SELECT * FROM reservations WHERE id = ?", [id], (error, result) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.findReservationByDate = async (date, callback) => {
	db.query(
		"SELECT * FROM reservations WHERE date = ? AND (status = 'PENDING' OR status = 'CONFIRMED')",
		[date],
		(error, result) => {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		}
	);
};

exports.findReservationByRange = async (start, end, callback) => {
	//
	db.query(
		"SELECT * FROM reservations WHERE date BETWEEN ? AND ? AND ( status = 'PENDING' OR status = 'CONFIRMED' );",
		[start, end],
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

exports.findReservationByStatus = async (status, callback) => {
	//
	db.query("SELECT COUNT(id) as count FROM reservations WHERE status = ?", [status], (error, result) => {
		//
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.findReservationByAccountId = async (id, callback) => {
	db.query(
		"SELECT id, date, time, status, created_at FROM reservations WHERE user_id = (SELECT id FROM users WHERE account_id = ?);",
		[id],
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

exports.updateReservation = async (id, data, callback) => {
	db.query("UPDATE reservations SET ?, updated_at = NOW() WHERE id = ?", [data, id], (error, result) => {
		//
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.updateReservationStatus = async (id, data, callback) => {
	db.query("UPDATE reservations SET status = UPPER(?), updated_at = NOW() WHERE id = ?", [data, id], (error, result) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};
