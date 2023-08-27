//
//
//

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
    //
    const cookies = req.cookies.jwt;
    if (!cookies) return res.sendStatus(401);
    
    User.findUserById
    
};

module.exports = checkUser;
