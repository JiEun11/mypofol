const modelAccount = require("../models/account");
const jwt = require('jsonwebtoken');

exports.authorizeNotRequired = (req, res, next) => {
  if (req.session.authAccount) {
    res.redirect("/");
    return;
  }

  next && next();
};

exports.authorizeRequired = (req, res, next) => {
  if (!req.session.authAccount) {
    res.redirect("/?signin");
    return;
  }

  next && next();
};

exports.validAccount = async (req, res, next) => {
  try {
    const account = await modelAccount.findByName(req.params.account);
    if (!account) {
      res.status(404).render("error/404");
      return;
    }
    req.account = account;

    next && next();
  } catch (err) {
    next(err);
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['cookie'];
    const token = authHeader?.split(' ')[1].split('=')[1];
    console.log('authHeader ??? ' , authHeader);
    console.log('token ??? ' , token);
    if(!token){
      console.log('[server][jwt] wrong token format or token is not sended');
      return res.status(400).json(null);
    }

    const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(`[server][jwt] verified: ${JSON.stringify(verified)}`);

    req.authAccount = {
      id: verified.id
    }

    next?.();

  } catch (error) {
    console.log('[server][jwt] redirect: /api/refresh-token :: ', error);
    return  res.redirect('/api/refresh-token');
  }

};
