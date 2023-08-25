//
//
//

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware
// const authenticateToken = require("./middlewares/authMiddleware");

// Import routes
const LoginRoutes = require("./routes/auth.routes");
const UserRoutes = require("./routes/user.routes");

var corsOption = {
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200,
};

// Set up middleware and static file serving
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", LoginRoutes);
app.use("/api/user", UserRoutes);
// app.use("/api/reservations", reservationsRoute);
// app.use("/api/account", accountRoute);

module.exports = app;
