const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

exports.addTransaction = (req, res) => {
    let newTransaction = new Transaction(req.body);
    newTransaction.save((err, transaction) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(transaction);
        }
    });
};
exports.getTransactions = (req, res) => {
    let filter = req.body.filter;
    Transaction.find(filter).exec((err, transactions) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(transactions);
        }
    });
};
exports.updateTransactions = (req, res) => {
    let filter = req.body.filter;
    // Transaction.update(filter).exec((err, transactions) => {
    //     if (err) {
    //         return res.status(400).send({
    //             message: err
    //         });
    //     } else {
    //         return res.json(transactions);
    //     }
    // });
};
exports.deleteTransaction = (req, res) => {
};
