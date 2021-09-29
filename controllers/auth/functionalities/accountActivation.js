const errorsUtil = require('../../../utils/errors');
const {activateAccount, removeActivationCode} = require('../../../models/user/userModel');

async function accountActivation(activationCode) {
    try {
        await activateAccount(activationCode)
        removeActivationCode(activationCode)
        return true
    } catch (e) {
        const error = errorsUtil.errorFormat()
        error.statusCode = 404
        error.msg = errorsUtil.errorMessages.invalidActivationCode;
        throw(error)
    }
}

module.exports = {accountActivation}
