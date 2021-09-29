const {getUploadedGameDetails} = require('../../../models/games/gamesModel');

async function gameDetailsForm(userId) {
    const data = await getUploadedGameDetails(userId);
    if (data === undefined) {
        return {
            game_id: '',
            game_name: '',
            description: '',
            game_url: '',
            release_year: ''
        }
    }
    return data;
}

module.exports = {gameDetailsForm}

