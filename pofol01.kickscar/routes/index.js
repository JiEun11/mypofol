const express = require('express');

const {resLocals, slash, error404, error500} = require('./middlewares');
const mainRouter = require('./main');

exports.appRouter = (app) => app
    .all('*', resLocals)
    .all('*', slash)
    .use('/', mainRouter)
    .use(error404)
    .use(error500);
