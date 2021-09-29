const {getAllGames, getGamesByYear, getGameDetail} = require('../controllers/games/gamesCatalogController')
const express = require('express');
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
        res.redirect('/');
    }
});

router.get('/game/:gameId', async function (req, res, next) {
    try {
        const data = await getGameDetail(req.params.gameId);
        res.render('gameDetail', data);
    } catch (e) {
        res.redirect('/')
    }
});


module.exports = router;
