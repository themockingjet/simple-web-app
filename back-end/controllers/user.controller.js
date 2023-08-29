//
//
//

const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpassword;
    User.createUser(req.body, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Internal server error" });
        } else {
            res.status(200).send({ message: "Account created successfully." });
        }
    });
};

exports.checkEmailExists = async (req, res) => {
    User.findUserByEmail(req.params.email, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                res.status(409).send({ message: "Email already exists." });
            } else {
                res.status(200).send();
            }
        }
    });
};

exports.findUserByEmail = async (req, res) => {
    User.findUserByEmail(req.params.email, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                res.status(200).send({ message: "Email already exists." });
            } else {
                res.status(200).send({ message: "Email does not exist." });
            }
        }
    });
};
