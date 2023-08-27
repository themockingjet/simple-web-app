//
//
//

const express = require("express");
const router = express.Router();
const Token = require("../controllers/refresh_token.controller");

router.get("/", Token.refreshToken);

module.exports = router;
