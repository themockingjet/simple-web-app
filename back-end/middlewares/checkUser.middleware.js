//
//
//

const jwt = require("jsonwebtoken");
const Account = require("../models/accountModel");

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.local.user = null;
            } else {
                Account.findUserById(user.id, (err, results) => {
                    if (err) {
                        res.redirect("/login");
                    } else {
                        res.local.user = results[0].username;
                        next();
                    }
                });
            }
        });
    } else {
        res.local.user = null;
        next();
    }
};

module.exports = checkUser;
