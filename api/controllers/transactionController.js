const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const Account = mongoose.model('Account');
const async = require('async');
exports.addTransaction = (req, res) => {
    addTransaction(req.body).then((response) => {
        return res.status(response.status).json(response.json);
    }).catch((err) => {
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
        addTransaction(element).then((response) => {
            return response;
        }).catch((err) => {
            return err;
            console.log(err);
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
 * @param obj : this is the transaction object
 *  returns a promise.
 */
function addTransaction(obj) {
    return new Promise((resolve, reject) => {
        try {
            let newTransaction = new Transaction(obj); // creates a transaction object which matches the data model(validation included).
            Account.findOne({ accountNumber: newTransaction.account }).exec((err, acc) => {
                condition = false;
                if (acc && newTransaction.balance ){// compare new balance with current.
                    if(newTransaction.type=='debit')
                        condition = acc.balance > 0 ? newTransaction.balance == (acc.balance - newTransaction.transaction) : true;
                    else
                        condition = acc.balance > 0 ? newTransaction.balance == (acc.balance + newTransaction.transaction) : true;
                    console.log(`${acc.balance} > 0 ? ${newTransaction.balance} == (${acc.balance} + ${newTransaction.transaction}) : true`);
                }
                if (condition) {
                    acc.balance = newTransaction.balance;
                    acc.save((err, data) => {
                        if (err)
                            return reject(err);
                        newTransaction.save((err, transaction) => {
                            if (err) {
                                return reject({ status: 500, send: { message: err } });
                            } else {
                                return resolve({ status: 200, json: transaction });
                            }
                        });
                    });
                } else {
                    return reject({ status: 409, send: { message: 'error in adding data' } });
                }
            });
        } catch (e) {
            return reject({ status: 500, send: { message: err } });
        }
    });
}