const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    account: {
        type: String,
        trim: true,
        required: true
    },
    transaction: {
        type: Number,
        required: true,
        index: true,
    },
    balance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Date,
        index: true,
        required: true
    },
    geoLocation: {
        type: Object
    },
    user: {
        type:String,
        required:true
    },
    category: String,
    Comment: String
});
TransactionSchema.index({ date: 1, transaction: 1, balance: 1, type:1 }, { unique: true });

mongoose.model('Transaction', TransactionSchema);