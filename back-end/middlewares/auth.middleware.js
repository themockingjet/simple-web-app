//
//
//

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.redirect("/login");
            } else {
                req.user = user.username;

                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

module.exports = authenticateToken;
