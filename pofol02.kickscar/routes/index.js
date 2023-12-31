const express = require('express');
const {resLocals, slash, jsonResult, error404, error500} = require('./middlewares');
const routerMain = require('./main');
const routerApi = require('./api');

exports.appRouter = (app) => app
    .all('*', resLocals)
    .all('*', slash)
    .use(jsonResult)
    .use('/', routerMain)
    .use('/api', routerApi)
    .use(error404)
    .use(error500);
