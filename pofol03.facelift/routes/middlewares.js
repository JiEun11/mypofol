exports.resLocals = (req, res, next) => {
    res.locals.req = req;
    res.locals.res = res;

    next && next();
};

exports.slash = (req, res, next) => {
    const urlPath = req.originalUrl;
    if(urlPath !== "/" && urlPath.endsWith("/")) {
        res.redirect(urlPath.substr(0, urlPath.length-1));
        return;
    }

    next && next();
};

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
            if(param && param.then != undefined) { // Async Call
                return param.then((obj) => {
                    res.json = jsonOriginalFn;
                    return jsonOriginalFn.call(res, jsonResult(obj));
                }).catch((err) => {
                    next(err);
                });
            } else { // Non-Async Call
                res.json = jsonOriginalFn;
                return jsonOriginalFn.call(res, jsonResult(param));
            }
        }

        next && next();
    
    } catch (error) {
        next && next(error);
    }
}

exports.error404 = (req, res) => {
    /* html */
    if(req.accepts('html')) {
        res.status(404).render('error/404')
        return;
    }
    
    /* json */
    res.status(404).send(new Error('unknown request'));
};

exports.error500 = (err, req, res, next) => {
    console.error(err.stack);

    /* html */
    if(req.accepts('html')) {
        res.status(err.status || 500).render('error/500', {
            error: err.stack
        });
        return;
    }

    /* json */
    res
    .status(500)
    .json(new Error(err.stack));    
}