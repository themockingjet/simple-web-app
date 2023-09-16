//
//
//

const app = require("./app");
const db = require("./config/db_config");

const PORT = process.env.PORT || 8080;

db.connect((err) => {
	if (err) throw err;

	console.log("Connected to the database!");

	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
});
