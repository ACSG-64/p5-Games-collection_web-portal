const express = require('express');
const multer = require('multer');
const {check, validationResult} = require('express-validator');
const {errorMessages} = require('../utils/errors')
const {gameUploader, gameDetailsForm} = require('../controllers/profile/profileController');
const {authenticateUser} = require("../controllers/auth/authController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.use(async function (req, res, next) {
    try {
        res.locals.userId = await authenticateUser(req.cookies.Session);
        next()
    } catch (e) {
        res.redirect('../auth');
    }
})

router.get('/game', async function (req, res, next) {
    try {
        const data = await gameDetailsForm(res.locals.userId);
        res.render('gameForm', data);
    } catch (e) {
        res.render('gameForm');
    }
});

router.post('/game-publication', upload.single('gameScreenshot'), [
    check('gameTitle')
        .isAlphanumeric('en-US', {ignore: ' '}).withMessage(errorMessages.gameName)
        .isLength({min: 3, max: 50}).withMessage(errorMessages.gameName),
    check('gameDescription')
        .isLength({max: 350}),
    check('gameUrl')
        .isURL().withMessage(errorMessages.gameLink),
    check('releaseYear')
        .isNumeric().withMessage(errorMessages.publicationDate)
], async function (req, res, next) {
    const assertions = validationResult(req);
    if (!assertions.isEmpty()) {
        return res.status(422).render('notification', {isError: true, messages: [...assertions.errors]})
    }

    try {
        const gameId = await gameUploader(req.body, res.locals.userId, req.file);
        res.redirect('../game/' + gameId)
    } catch (e) {
        res.status(e.statusCode).render('notification', {isError: true, messages: [e]})
    }
});

module.exports = router;
