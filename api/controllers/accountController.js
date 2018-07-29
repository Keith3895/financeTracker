const mongoose = require('mongoose');
const Account = mongoose.model('Account');
const validator = require('../validator');
exports.addAccount = (req, res) => {
    let validation = validator.validateBank(req.body);
    if (validation.errorMessage) {
        return res.status(500).json(validation);
    }
    let newAccount = new Account(req.body);
    newAccount.save((err, acc) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(acc);
        }
    });
};
exports.getAccounts = (req, res) => {
    let username = req.body.username;
    Account.find({ user: username }, (err, accounts) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(accounts);
        }
    });
};