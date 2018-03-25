const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.addAccount = (req, res) => {
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
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(accounts);
        }
    });
};