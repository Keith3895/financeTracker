const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    accountNumber:{
        type:String,
        required:true,
        unique: true
    },
    balance:{
        type: Number,
        required:true,
    },
    user: String,
    bankName : {
        type : String,
        requires : true
    },
    overrideBalance : Boolean
});

mongoose.model('Account', AccountSchema);