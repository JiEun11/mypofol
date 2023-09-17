const express = require('express');
const {resLocals, slash, error404, error500, jsonResult} = require('./middlewares');
const {dispatcher} = require('./dispatcher');

exports.appRouter = (app) => app
    .all('*', resLocals)
    .all('*', slash)
    .use(jsonResult)
    .use('/', dispatcher)
    .use(error404)
    .use(error500);
