const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    account: {
        type: String,
        trim: true,
        required: true
    },
    transaction: {
        type: String,
        required: true,
        index: true,
    },
    balance: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Number,
        index: true,
        required: true
    },
    geoLocation: {
        type: Object
    },
    user: String,
    catergory: String,
    Comment: String
});
TransactionSchema.index({ date: 1, transaction: 1, balance: 1, type:1 }, { unique: true });

mongoose.model('Transaction', TransactionSchema);