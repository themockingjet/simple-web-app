//
//
//

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");
const authenticateToken = require("./middlewares/auth.middleware");
const corsOption = require("./config/corsOptions");
const { logger } = require("./middlewares/eventLogger.middleware");

// Import routes
const AuthRoutes = require("./routes/auth.routes");
const RegisterRoutes = require("./routes/register.routes");
const UserRoutes = require("./routes/user.routes");

// custom middleware logger
app.use(logger);

// cors middleware
app.use(cors(corsOption));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/register", RegisterRoutes);
app.use(authenticateToken);
app.use("/api/user", UserRoutes);
// app.use("/api/reservations", reservationsRoute);
// app.use("/api/account", accountRoute);

app.all("*", (req, res) => {
    res.status(404).send({ message: "Url not found." });
});
app.use(errorHandler);

module.exports = app;
