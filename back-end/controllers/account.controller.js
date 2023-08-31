//
//
//

const Account = require("../models/account.model");

exports.updateAccount = async (req, res) => {
    //
    await Account.updateAccount(req.params.id, req.body, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

exports.updateAccountRole = async (req, res) => {
    //
    const reqID = req.cookies.id;
    const editID = req.params.id;

    if (reqID === editID) return res.sendStatus(403);
    const role = req.body.role;
    await Account.updateAccountRole(editID, role, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};
