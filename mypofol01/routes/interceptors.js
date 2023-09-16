const modelAccount = require('../models/account');

exports.authorizeNotRequired = (req, res, next) => {
    if(req.session.authAccount) {       
        res.redirect('/');   
        return;
    } 

    next && next();
}

exports.authorizeRequired = (req, res, next) => {
  if(!req.session.authAccount) {       
      res.redirect('/?signin');   
      return;
  } 

  next && next();
};

exports.validAccount = async (req, res, next) => {
    try {
        const account = await modelAccount.findByName(req.params.account || req.session.authAccount && req.session.authAccount.name);
        if(!account) {
            res.status(404).render('error/404');
            return;
        }
        req.account = account;
        
        next && next();
    } catch(err){
        next(err);
    }
};
