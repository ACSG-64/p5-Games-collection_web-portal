const db = require('../../database/db');

function addUser(dataObj) {
    const {userName, name, lastname, password} = dataObj;
    return db.query('INSERT INTO users (user_name, pswd, names, lastnames, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
        [userName, password, name, lastname, false])
}

function addActivationCode(userId, confCode) {
    return db.query('INSERT INTO activation_codes (user_id, code) VALUES ($1, $2)', [userId, confCode])
}

async function changeAccountStatus(confCode, newState = true) {
    const result = await db.query('SELECT user_id FROM activation_codes WHERE code=$1', [confCode]);
    await db.query('UPDATE users SET is_active=$1 WHERE user_id=$2', [newState, result.rows[0].user_id]);
}

async function removeActivationCode(confCode) {
    await db.query('DELETE FROM activation_codes WHERE code=$1', [confCode]);
}

async function retrieveUser(userName) {
    const results = await db.query('SELECT user_id, user_name, pswd, is_active FROM users WHERE user_name=$1', [userName]);
    return results.rows[0]
}

function updateUser(dataObj) {
}

module.exports = {
    addUser,
    addActivationCode,
    activateAccount: changeAccountStatus,
    removeActivationCode,
    retrieveUser,
    updateUser
}
