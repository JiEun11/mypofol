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
    if(req.accepts('html')) {
        res.status(404).render('error/404')
        return;
    }
};

exports.error500 = (err, req, res) => {
    console.error(err.stack);

    if(req.accepts('html')) {
        res.status(err.status || 500).render('error/500', {
            error: err.stack
        });
        
        return;
    }
}