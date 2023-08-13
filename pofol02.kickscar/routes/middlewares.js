exports.resLocals = (req, res, next) => {
    res.locals.req = req;
    res.locals.res = res;

    next();
};

exports.slash = (req, res, next) => {
    const urlPath = req.originalUrl;
    if(urlPath !== "/" && urlPath.endsWith("/")) {
        res.redirect(urlPath.substr(0, urlPath.length-1));
        return;
    }

    next();
};

exports.error404 = (req, res) => {
    /* response(404) html */
    if(req.accepts('html')) {
        res.status(404).render('error/404')
        return;
    }
    
    /* response(404) json */
    res.status(404).send({
        result: 'fail',
        data: null,
        message: 'unknown request'
    });    
};

exports.error500 = (err, req, res, next) => {
    console.error(err.stack);

    /* response(500) html */
    if(req.accepts('html')) {
        res.status(err.status || 500).render('error/500', {
            error: err.stack
        });
        
        return;
    }

    /* response(500) json */
    res.status(500).send({
        result: 'fail',
        data: null,
        message: err.stack
    });    
}