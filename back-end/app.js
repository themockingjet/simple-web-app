//
//
//

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error_handler.middleware");
const authenticateToken = require("./middlewares/auth.middleware");
const corsOption = require("./config/cors_options");
const credentials = require("./middlewares/credentials.middleware");
const { logger } = require("./middlewares/event_logger.middleware");

// Import routes
const AuthRoutes = require("./routes/auth.routes");
const RefreshRoutes = require("./routes/refresh.routes");
const RegisterRoutes = require("./routes/register.routes");
const UserRoutes = require("./routes/user.routes");
const ReservationRoutes = require("./routes/reservation.routes");
const TableRoutes = require("./routes/table.routes");
const AccountRoute = require("./routes/account.routes");

// custom middleware logger
app.use(logger);

// cors middleware
app.use(credentials);
app.use(cors(corsOption));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/register", RegisterRoutes);
app.use("/api/refresh", RefreshRoutes);
app.use(authenticateToken);
app.use("/api/user", UserRoutes);
app.use("/api/reservation", ReservationRoutes);
app.use("/api/table", TableRoutes);
app.use("/api/account", AccountRoute);

app.all("*", (req, res) => {
	res.status(404).send({ message: "Url not found." });
});

app.use(errorHandler);

module.exports = app;
