//
//
//

const allowed_origins = require("../config/allowed_origins");

const credentials = (req, res, next) => {
    //
    const origin = req.headers.origin;
    if (allowed_origins.indexOf(origin) !== -1 || !origin) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};

module.exports = credentials;
