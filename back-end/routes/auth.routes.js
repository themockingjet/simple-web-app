//
//
//

const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth.controller");

router.post("/login", Auth.Login);
router.get("/logout", Auth.Logout);

module.exports = router;
