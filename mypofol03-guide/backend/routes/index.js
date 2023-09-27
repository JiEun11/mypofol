const express = require('express');
const { resLocals, error404, error500, jsonResult, acceptOnlyJsonRequest } = require('./middlewares');
const { dispatcher } = require('./dispatcher');
const { dispatcherApi } = require('./dispatcher-api');

exports.appRouter = (app) => app
    .all('*', resLocals)
    .use(jsonResult)
    .use('/', dispatcher)
    .use('/api', acceptOnlyJsonRequest, dispatcherApi)
    .use(error404)
    .use(error500);
