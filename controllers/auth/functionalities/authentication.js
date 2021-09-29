const jwt = require('jsonwebtoken');

async function authenticateUser(jsonWebToken) {
    // UNHANDLED ERROR
    const userId = await jwt.verify(jsonWebToken, process.env.JWT_KEY);
    return userId.userId
}

module.exports = {authenticateUser}
