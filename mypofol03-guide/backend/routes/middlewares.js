const logger = require('../logger');

exports.resLocals = (req, res, next) => {
    res.locals.req = req;
    res.locals.res = res;
    next?.();
};

exports.acceptOnlyJsonRequest = (req, res, next) => {
    /* if request with accept html */
    if (req.accepts('html')) {
        return res.status(400).end();
    }

    /* if request with accept json */
    next?.();
}

exports.jsonResult = (req, res, next) => {
    try {
        const jsonResult = (obj) => obj instanceof Error ? {
            result: 'fail',
            data: null,
            message: obj.message
        } : {
            result: 'success',
            data: obj,
            message: null
        };

        const jsonOriginalFn = res.json;

        res.json = (param) => {
            if (param && param.then != undefined) {                     // Async Call
                return param.then((obj) => {
                    res.json = jsonOriginalFn;
                    return jsonOriginalFn.call(res, jsonResult(obj));
                }).catch((error) => {
                    next?.(error);
                });
            } else {                                                    // Non-Async Call
                res.json = jsonOriginalFn;
                return jsonOriginalFn.call(res, jsonResult(param));
            }
        }

        next?.();

    } catch (error) {
        next?.(error);
    }
}

exports.error404 = (req, res) => {
    /* if request with accept html */
    if (req.accepts('html')) {
        return res.render('index');
    }

    /* if request with accept json */
    res.status(404).json(new Error('unknown request'));
};

exports.error500 = (error, req, res, next) => {
    /* logging */
    logger.error(error.stack);

    /* if request with accept html */
    if (req.accepts('html')) {
        return res.status(error.status || 500).render('error/500', {
            error: error.stack
        });
    }

    /* if request with accept json */
    res.status(process.env.NODE_ENV === "development" ? 200 : 500).json(new Error(error.stack));
}