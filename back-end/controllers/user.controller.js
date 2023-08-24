//
//
//

const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
};
