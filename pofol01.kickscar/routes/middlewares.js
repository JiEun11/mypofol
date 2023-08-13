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
    res.status(404).render('error/404')
};

exports.error500 = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).render('error/500', {
        error: err.stack
    });
}