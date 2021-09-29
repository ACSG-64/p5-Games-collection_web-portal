const {getUploadedGameDetails, publishGame, updateGameDetails, getImageName} = require('./functionalities/gamesInsertion');
const {retrieveAllGames, retrieveGamesByYear, retrieveGameDetail} = require('./functionalities/gamesCatalog');

module.exports = {
    getUploadedGameDetails,
    publishGame,
    updateGameDetails,
    getImageName,

    retrieveAllGames,
    retrieveGamesByYear,
    retrieveGameDetail
}
