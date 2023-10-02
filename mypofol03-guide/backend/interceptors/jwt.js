const jwt = require('jsonwebtoken');
const logger = require('../logger');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      logger.info('[server][jwt] wrong token format or token is not sended');
      return res.status(400).json(null);
    }

    const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    logger.info(`[server][jwt] verified: ${JSON.stringify(verified)}`);

    req.authAccount = {
      id: verified.id
    };

    next?.();

  } catch (error) {
    logger.info('[server][jwt] redirect: /api/refresh-token');
    return res.redirect('/api/refresh-token');
  }
};