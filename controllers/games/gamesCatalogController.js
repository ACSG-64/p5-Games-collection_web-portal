const {retrieveAllGames, retrieveGamesByYear, retrieveGameDetail} = require('../../models/games/functionalities/gamesCatalog');

async function getAllGames() {
    try {
        return await retrieveAllGames()
    } catch(e) {
        return []
    }
}

async function getGamesByYear(year) {
    try {
        return await retrieveGamesByYear(year)
    } catch(e) {
        return []
    }
}

async function getGameDetail(gameId) {
    const data = await retrieveGameDetail(gameId)
    if(data === undefined) throw('Data not found')
    return data
}

module.exports = {getAllGames, getGamesByYear, getGameDetail}
