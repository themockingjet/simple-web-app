//
//
//

require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    //
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    //

    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
        //
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) res.redirect("/login");

            req.user = decoded.email;
            next();
        });
    } else {
        res.status(401).send();
    }
};

module.exports = authenticateToken;
