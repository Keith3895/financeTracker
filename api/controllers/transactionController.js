const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const Account = mongoose.model('Account');
const async = require('async');
exports.addTransaction = (req, res) => {
    addTransaction(req.body).then((response) => {
        return res.status(response.status).json(response.json);
    }).error((err) => {
        return res.status(err.status).json(err.send);
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

exports.addMultiTransactions = async (req, res) => {
    let transactionArray = req.body;
    await transactionArray.sort((a, b) => {
        return a.date - b.date;
    });
    transactionArray.forEach(element => {
        addTransaction(req.body).then((response) => {
            return response;
        }).error((err) => {
            return err;
        });
    });
};

exports.updateTransactions = (req, res) => {
    let filter = req.body.filter;
};
exports.deleteTransaction = (req, res) => {
};

/**
 * This function is to add individual transacton objects.
 * @param {*} obj : this is the transaction object
 *  returns a promise.
 */
function addTransaction(obj) {
    return new Promise((resolve, reject) => {
        try {
            let newTransaction = new Transaction(obj); // creates a transaction object which matches the data model(validation included).
            Account.find({ accountNumber: newTransaction.account }).exec((err, acc) => {
                // compare new balance with current.
                condition = acc.ballance? newTransaction.ballance == (acc.ballance - newTransaction.transaction):true;
                    if (condition) {
                        acc.ballance = newTransaction.ballance;
                        acc.save((err, savedAcc) => {
                            newTransaction.save((err, transaction) => {
                                if (err) {
                                    return reject({
                                        status: 400,
                                        send: {
                                            message: err
                                        }
                                    });
                                } else {
                                    return resolve({
                                        status: 200,
                                        json: transaction
                                    });
                                }
                            });
                        });
                    } else {
                        return reject({
                            status: 409,
                            send: {
                                message: 'error in adding data'
                            }
                        });
                    }
                }
            });
        } catch (e) {
            return reject({
                status: 400,
                send: {
                    message: err
                }
            });
        }
    });
}