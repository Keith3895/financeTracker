
function validateBank(obj) {
    if (obj.bankName) {
        if (typeof obj.bankName !== 'string')
            return { errorMessage: "only string Format is accepted" };
    } else
        return { errorMessage: "BankName is not Recieved" };
    if (obj.mobileNumber) {
        if (obj.mobileNumber.toString().length !== 10)
            return { errorMessage: "Mobile Number does not have 10 digits" };
    } else
        return { errorMessage: "Mobile number is not Recieved" };
    if (obj.accountNumber) {
        if (obj.accountNumber.toString().length < 11 && obj.accountNumber.toString().length >17)
            return { errorMessage: "Account number is not acceptable" };
    } else
        return { errorMessage: "Account number is not Recieved" };
    return true;
}

module.exports = {
    validateBank: validateBank
};