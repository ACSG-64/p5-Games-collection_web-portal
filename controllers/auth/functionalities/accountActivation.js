const errorsUtil = require('../../../utils/errors');
const httpCode = require('../../../utils/httpCodes');
const {activateAccount, removeActivationCode} = require('../../../models/user/userModel');

async function accountActivation(activationCode) {
    try {
        await activateAccount(activationCode);
        removeActivationCode(activationCode);
        return true
    } catch (e) {
        const error = errorsUtil.errorFormat();
        error.statusCode = httpCode.NOT_FOUND;
        error.msg = errorsUtil.errorMessages.invalidActivationCode;
        throw(error)
    }
}

module.exports = {accountActivation}
