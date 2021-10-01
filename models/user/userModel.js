const db = require('../../database/db');

async function addUser(dataObj) {
    const {userName, name, lastname, password} = dataObj;
    const result = await db.query('INSERT INTO users (user_name, pswd, names, lastnames, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
        [userName, password, name, lastname, false])
    return result.rows[0].user_id;
}

async function retrieveUser(userName) {
    const results = await db.query('SELECT user_id, user_name, pswd, is_active FROM users WHERE user_name=$1', [userName]);
    return results.rows[0]
}

async function removeUser(userId) {
    await db.query('DELETE FROM users WHERE user_id=$1', [userId]);
}

async function changeAccountStatus(confCode, newState = true) {
    const result = await db.query('SELECT user_id FROM activation_codes WHERE code=$1', [confCode]);
    await db.query('UPDATE users SET is_active=$1 WHERE user_id=$2', [newState, result.rows[0].user_id]);
}

async function removeActivationCode(confCode) {
    await db.query('DELETE FROM activation_codes WHERE code=$1', [confCode]);
}

function addActivationCode(userId, confCode) {
    return db.query('INSERT INTO activation_codes (user_id, code) VALUES ($1, $2)', [userId, confCode])
}

function updateUser(dataObj) {
}

module.exports = {
    addUser,
    removeUser,
    addActivationCode,
    activateAccount: changeAccountStatus,
    removeActivationCode,
    retrieveUser,
    updateUser
}
