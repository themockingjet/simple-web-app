//
//
//

const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    User.findUserByEmail(email, async (err, result) => {
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, async (err, bool) => {
                if (bool) {
                    const token = createToken(result[0].id);
                    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).send({ user: result[0].email, message: "Success! You are logged in." });
                } else {
                    res.status(401).send({ user: null, message: "Incorrect password." });
                }
            });
        } else {
            res.status(401).send({ user: null, message: "Account does not exist." });
        }
    });
};

exports.Logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
};
