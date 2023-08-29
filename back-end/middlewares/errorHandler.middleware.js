//
//
//

const { format } = require("date-fns");
const { logEvents } = require("./eventLogger.middleware");

const errorHandler = (err, req, res, next) => {
    const dateTime = `${format(new Date(), "yyyy-MM-dd")}`;
    logEvents(`${err.name}: ${err.message}`, `error-${dateTime}.txt`);
    console.error(err.stack);
    res.status(500).send(err.message);
};

module.exports = errorHandler;
