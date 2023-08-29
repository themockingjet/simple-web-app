//
//
//

const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/refresh_token.controller");

router.get("/", TokenController.refreshToken);

module.exports = router;
