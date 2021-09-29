const argon2 = require('@phc/argon2');
const {createHash} = require('crypto');
const errorsUtil = require('../../../utils/errors')
const {addUser, addActivationCode} = require('../../../models/user/userModel');
const {sendActivationMail} = require('../../emailSender/emailSender')

async function registerUser(reqBody) {
    let insertId;
    // Hash the password with Argon2id hash
    reqBody.password = await argon2.hash(reqBody.password)
    // Add the user data to the DB
    try {
        const result = await addUser(reqBody);
        insertId = result.rows[0].user_id;
    } catch (e) {
        const error = errorsUtil.errorFormat();
        error.statusCode = 409
        error.msg = errorsUtil.errorMessages.existingUser;
        throw(error);
    }
    // Set and send the activation code
    try {
        await setActivationCode(insertId, reqBody.userName, reqBody.name, reqBody.uolEmail)
    } catch (e) {
        throw(errorsUtil.errorFormat()); // Unknown error
    }

    return `Account created, an email was sent to ${reqBody.uolEmail} to activate your account.`
}

async function setActivationCode(userId, userName, userRealName, email) {
    // Create the activation code
    const activationCode = createHash('md5')
        .update(`${userId}${userName}${Date.now()}${Math.random()}`)
        .digest('hex');
    // Add the activation  code to the data base
    await addActivationCode(userId, activationCode)
    // Send the activation  code through email
    await sendActivationMail(email, userRealName, activationCode)
}

module.exports = {registerUser}
