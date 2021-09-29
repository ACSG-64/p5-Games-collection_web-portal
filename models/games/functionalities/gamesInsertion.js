const db = require('../../../database/db');

async function publishGame(dataObj, userId, imageName) {
    const {gameTitle, gameDescription, gameUrl, releaseYear} = dataObj
    const result = await db.query(
        'INSERT INTO games (user_id, game_name, description, game_url, cover_image, release_year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING game_id',
        [userId, gameTitle, gameDescription, gameUrl, imageName, releaseYear])
    return result.rows[0].game_id;
}

async function updateGameDetails(dataObj, userId, imageName) {
    const {gameTitle, gameDescription, gameUrl, releaseYear} = dataObj;
    const result = await db.query('UPDATE games SET game_name=$1, description=$2, game_url=$3, cover_image=$4, release_year=$5 WHERE user_id=$6 RETURNING game_id',
        [gameTitle, gameDescription, gameUrl, imageName, releaseYear, userId])
    return result.rows[0].game_id;
}

async function getImageName(userId) {
    const result = await db.query('SELECT cover_image FROM games WHERE user_id=$1', [userId]);
    try {
        return result.rows[0].cover_image;
    } catch(e) {
        return undefined;
    }

}

async function getUploadedGameDetails(userId) {
    const result = await db.query('SELECT game_id, game_name, description, game_url, release_year FROM games WHERE user_id=$1',
        [userId])
    return result.rows[0];
}

module.exports = {getUploadedGameDetails, publishGame, updateGameDetails, getImageName}
