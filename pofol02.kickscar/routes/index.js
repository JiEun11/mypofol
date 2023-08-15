const express = require('express');
const {resLocals, slash, jsonResult, error404, error500} = require('./middlewares');
const routerMain = require('./main');

exports.appRouter = (app) => app
    .all('*', resLocals)
    .all('*', slash)
    .use(jsonResult)
    .use('/', routerMain)
    .use(error404)
    .use(error500);
