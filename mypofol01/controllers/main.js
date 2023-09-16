module.exports = {
    index: (req, res, next) => {
        if(req.session.authAccount) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/index');
    },
    signin: (req, res, next) => {
        if(req.session.authAccount) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/signin');
    },
    signup: (req, res, next) => {
        if(req.session.authAccount) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/signup');
    }    
}