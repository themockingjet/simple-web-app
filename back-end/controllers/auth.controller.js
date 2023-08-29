//
//
//

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 1000 * 60 * 60 * 24;
const minAge = 1000 * 60 * 10;

exports.Login = async (req, res) => {
    //
    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, result) => {
        //
        if (result.length > 0) {
            //
            const match = await bcrypt.compare(password, result[0].password);

            if (!match) return res.sendStatus(401);

            const accessToken = jwt.sign({ id: result[0].id }, process.env.TOKEN_SECRET, {
                expiresIn: minAge,
            });
            const refreshToken = jwt.sign({ id: result[0].id, email: result[0].email }, process.env.TOKEN_SECRET, {
                expiresIn: maxAge,
            });

            // res.cookie("token", accessToken, { httpOnly: true, maxAge: 1000 * 60 * 5 });
            res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: maxAge });

            res.status(200).send({ id: result[0].id, email: result[0].email, role: result[0].is_admin, token: accessToken });
        } else {
            //
            res.sendStatus(401);
        }
    });
};

exports.Logout = (req, res) => {
    //
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("token", "", { maxAge: 1 });
};
