//
//
//

const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.refreshToken = (req, res) => {
    //
    const cookies = req.cookies;
    console.log(cookies.jwr);
    if (!cookies?.jwr) return res.sendStatus(401);
    const refreshToken = cookies.jwr;

    Account.verifyToken(refreshToken, (err, result) => {
        if (err) return res.sendStatus(500);
        if (result.length === 0) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, decoded) => {
            //
            if (err || result[0].email !== decoded.email) return res.sendStatus(403);

            const accessToken = jwt.sign({ id: result[0].id, email: result[0].email }, process.env.TOKEN_SECRET, {
                expiresIn: "10m",
            });

            res.json({ token: accessToken });
        });
    });
};
