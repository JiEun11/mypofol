const jwt = require('jsonwebtoken');
const modelAccount = require('../models/account');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      console.log('[server][jwt] wrong token format or token is not sended');
      return res.status(400).json(null);
    }

    const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(`[server][jwt] verified: ${JSON.stringify(verified)}`);

    req.authAccount = {
      id: verified.id
    };

    next?.();

  } catch (error) {
    console.log('[server][jwt] redirect: /api/refresh-token');
    return res.redirect('/api/refresh-token');
  }
};

exports.validAccount = async (req, res, next) => {
  try {
    const account = await modelAccount.findByName(req.params.account);
    if (!account) {
      throw new Error(`Invalid Account(${req.params.account})`);
    }

    req.account = account;
    next?.();

  } catch (error) {
    next?.(error);
  }
};

exports.delayForTest = async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    next?.();
  } catch (error) {
    next?.(error);
  }
};