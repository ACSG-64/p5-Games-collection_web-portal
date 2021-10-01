const express = require('express');
const httpCode = require('../utils/httpCodes');
const {check, validationResult} = require('express-validator');
const {errorMessages} = require('../utils/errors')
const {registerUser, loginUser, accountActivation, authenticateUser} = require('../controllers/auth/authController');

const router = express.Router();

router.use(async function (req, res, next) {
    try {
        await authenticateUser(req.cookies.Session);
        res.status(httpCode.CONTINUE).redirect('../profile/game');
    } catch (e) {
        next()
    }
})

router.get('/', function (req, res, next) {
    res.render('auth');
});

router.post('/login', [
    check('userName')
        .isLength({min: 3, max: 15}).withMessage(errorMessages.userName)
        .isAlphanumeric().withMessage(errorMessages.userName),
    check('password')
        .isLength({min: 8, max: 30}).withMessage(errorMessages.password)
], async function (req, res, next) {
    const assertions = validationResult(req);
    if (!assertions.isEmpty()) {
        return res.status(httpCode.UNPROCESSABLE_ENTITY).render('notification', {
            isError: true,
            messages: [...assertions.errors]
        })
    }
    try {
        const jwt = await loginUser(req.body);
        res.cookie('Session', jwt, {
            httpOnly: true,
            secure: true
        }).status(httpCode.CONTINUE).redirect('../profile/game');
    } catch (e) {
        res.status(e.statusCode).render('notification', {isError: true, messages: [e]})
    }
});

router.post('/register', [
    check('userName')
        .isLength({min: 3, max: 15}).withMessage(errorMessages.userName)
        .isAlphanumeric().withMessage(errorMessages.userName),
    check('name')
        .isLength({min: 1, max: 80}).withMessage(errorMessages.realName)
        .isAlpha('en-US', {ignore: ' '}).withMessage(errorMessages.realName),
    check('lastname')
        .isLength({min: 1, max: 80}).withMessage(errorMessages.realLastname)
        .isAlpha('en-US', {ignore: ' '}).withMessage(errorMessages.realLastname),
    check('password')
        .isLength({min: 8, max: 30}).withMessage(errorMessages.password),
    check('uolEmail')
        .isEmail().withMessage(errorMessages.email)
    .contains('@student.london.ac.uk').withMessage(errorMessages.email)
], async function (req, res, next) {
    const assertions = validationResult(req);
    if (!assertions.isEmpty()) {
        return res.status(httpCode.UNPROCESSABLE_ENTITY).render('notification', {
            isError: true,
            messages: [...assertions.errors]
        })
    }
    try {
        const message = await registerUser(req.body);
        res.status(httpCode.CREATED).render('notification', {isError: false, messages: [{msg: message}]});
    } catch (e) {
        res.status(e.statusCode).render('notification', {isError: true, messages: [e]});
    }

});

router.get('/activation/:activationCode', async function (req, res, next) {
    try {
        await accountActivation(req.params.activationCode);
        res.render('notification', {isError: false, messages: [{msg: 'Account activated successfully'}]});
    } catch (e) {
        res.status(e.statusCode).render('notification', {isError: true, messages: [e]});
    }
});

module.exports = router;
