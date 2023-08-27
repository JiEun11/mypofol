module.exports = {
    index: (req, res, next) => {
        res.status(200).render('main/index');
    },
    signin: (req, res, next) => {
        res.status(200).render('main/signin');
    },
    signup: (req, res, next) => {
        res.status(200).render('main/signup');
    }    
}