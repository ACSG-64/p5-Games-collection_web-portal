const argon2 = require('@phc/argon2');
const jwt = require('jsonwebtoken');
const errorsUtil = require('../../../utils/errors');
const {retrieveUser} = require('../../../models/user/userModel');

async function loginUser(reqBody) {
    // Find the user in the data base
    let results = await retrieveUser(reqBody.userName);
    if (results === undefined)   {
        const error = errorsUtil.errorFormat();
        error.msg = errorsUtil.errorMessages.invalidCredentials;
        throw(error);
    }

    // Verify if account is active
    if(!results.is_active) {
        const error = errorsUtil.errorFormat();
        error.msg = errorsUtil.errorMessages.inactiveAccount;
        throw(error);
    }

    // Verify the password
    const passwordsMatch = await argon2.verify(results.pswd, reqBody.password);
    if (!passwordsMatch) {
        const error = errorsUtil.errorFormat();
        error.msg = errorsUtil.errorMessages.invalidCredentials;
        throw(error);
    }
    // Create and return the the jwt
    return await jwt.sign({
        userId: results.user_id,
        userName: results.user_name
    }, process.env.JWT_KEY, {expiresIn: '8h'});
}

module.exports = {loginUser}
