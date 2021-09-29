const {registerUser} = require('./functionalities/register')
const {loginUser} = require('./functionalities/login')
const {accountActivation} = require('./functionalities/accountActivation')
const {authenticateUser} = require('./functionalities/authentication')

module.exports = {registerUser, loginUser, accountActivation, authenticateUser}
