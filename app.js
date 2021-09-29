require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const layouts = require('handlebars-layouts');

const gamesCatalog = require('./routes/gameCatalog');
const authRouter = require('./routes/auth');
const userActions = require('./routes/userActions');

const app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper(layouts(hbs.handlebars));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/profile', userActions);
app.use('/', gamesCatalog);

module.exports = app;
