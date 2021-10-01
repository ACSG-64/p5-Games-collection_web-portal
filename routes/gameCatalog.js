const express = require('express');
const httpCode = require('../utils/httpCodes');
const {getAllGames, getGamesByYear, getGameDetail} = require('../controllers/games/gamesCatalogController')


const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const data = await getAllGames();
    res.render('gamesCatalog', {games: data, filter: 'All'});
});

router.get('/year', async function (req, res, next) {
    const year = parseInt(req.query.publishing_year);
    if (!isNaN(year)) {
        const data = await getGamesByYear(year);
        res.render('gamesCatalog', {games: data, filter: req.query.publishing_year});
    } else {
        res.status(httpCode.NOT_FOUND).redirect('/');
    }
});

router.get('/game/:gameId', async function (req, res, next) {
    try {
        const data = await getGameDetail(req.params.gameId);
        res.render('gameDetail', data);
    } catch (e) {
        res.status(httpCode.NOT_FOUND).redirect('/')
    }
});


module.exports = router;
