//
//
//

const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 1000 * 60 * 60 * 24;

exports.Login = async (req, res) => {
    //
    const {email, password} = req.body;

    Account.findAccountByEmail(email, async (err, result) => {
        //
        if (result.length > 0) {
            //
            const match = await bcrypt.compare(password, result[0].password);
            if (!match) return res.sendStatus(401);

            const accessToken = jwt.sign({id: result[0].id}, process.env.TOKEN_SECRET, {
                expiresIn: "10m",
            });
            const refreshToken = jwt.sign({id: result[0].id, email: result[0].email}, process.env.TOKEN_REFRESH, {
                expiresIn: "1d",
            });

            Account.updateAccount(result[0].id, {token: refreshToken}, (err, result) => {
                if (err) return res.sendStatus(500);
            });

            res.cookie("jwr", refreshToken, {httpOnly: true, maxAge: maxAge});
            res.status(200).send({id: result[0].id, email: result[0].email, role: result[0].is_admin, token: accessToken});
        } else {
            //
            res.sendStatus(401);
        }
    });
};

exports.Logout = (req, res) => {
    //
    const cookies = req.cookies;
    if (!cookies?.jwr) return res.sendStatus(204);
    const refreshToken = cookies.jwr;

    Account.verifyToken(refreshToken, (err, result) => {
        if (err) return res.sendStatus(500);
        if (result.length === 0) {
            res.clearCookie("jwr", {httpOnly: true, maxAge: 1});
            return res.sendStatus(204);
        }

        Account.updateAccount(result[0].id, {token: ""}, (err, result) => {
            if (err) return res.sendStatus(500);
        });

        res.clearCookie("jwr", {httpOnly: true, maxAge: 1});
        res.send(204);
    });
};
