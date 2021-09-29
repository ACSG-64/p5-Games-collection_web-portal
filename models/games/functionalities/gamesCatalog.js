const db = require('../../../database/db');

async function retrieveAllGames() {
    const results = await db.query(
        'SELECT users.names, users.lastnames, game_id, game_name, description, game_url, cover_image, release_year FROM games INNER JOIN users ON games.user_id=users.user_id ORDER BY random()',
        [])
    return results.rows;
}

async function retrieveGamesByYear(releaseYear) {
    const results = await db.query(
        'SELECT users.names, users.lastnames, game_id, game_name, description, game_url, cover_image, release_year FROM games INNER JOIN users ON games.user_id=users.user_id WHERE release_year=$1 ORDER BY random()',
        [releaseYear])
    return results.rows;
}

async function retrieveGameDetail(gameId) {
    const result = await db.query(
        'SELECT users.names, users.lastnames, game_name, description, game_url, cover_image FROM games INNER JOIN users ON games.user_id=users.user_id WHERE game_id=$1',
        [gameId])
    return result.rows[0];
}

module.exports = {retrieveAllGames, retrieveGamesByYear, retrieveGameDetail}
