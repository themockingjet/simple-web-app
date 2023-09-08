//
//
//

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {format} = require("date-fns");

exports.createUser = async (req, res) => {
    //
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpassword;

    User.createUser(req.body, (err, result) => {
        if (err) {
            res.status(500).send({message: "Internal server error"});
        } else {
            res.status(200).send({message: "Account created successfully."});
        }
    });
};

exports.findUsers = async (req, res) => {
    //
    User.findUsers((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};

exports.findUserById = async (req, res) => {
    //
    User.findUserById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};

exports.findUserByEmail = async (req, res) => {
    //
    User.findUserByEmail(req.params.email, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                res.status(409).send({message: "Email already exists."});
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
                res.status(200).send({message: "Email already exists."});
            } else {
                res.status(200).send({message: "Email does not exist."});
            }
        }
    });
};

exports.updateUser = async (req, res) => {
    //
    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: format(new Date(req.body.birthday), "yyyy-MM-dd"),
        contact_no: req.body.contact_no,
    };
    User.updateUser(req.params.id, data, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};
