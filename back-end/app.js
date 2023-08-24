//
//
//

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middlewares/authMiddleware");

// Import routes
const reservationsRoute = require("./routes/reservationsRoute");
const loginRoute = require("./routes/loginRoute");
const accountRoute = require("./routes/accountRoute");

const FRONTEND_URL = process.env.FRONTEND;

var corsOption = {
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200,
};

// Set up middleware and static file serving
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", loginRoute);
// app.route("/api");
app.use("/api/reservations", reservationsRoute);
app.use("/api/account", accountRoute);

module.exports = app;
