const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { modelAccount } = require("../models");
const logger = require('../logger');

dotenv.config({ path: path.join(__dirname, '../config/jwt.env') });

exports.signout = async (req, res, next) => {
  res
    .clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME)
    .json(null);
};

exports.auth = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const authAccount = await modelAccount.findByEmailAndPassword(email, password);
  logger.info(`[server][jwt] authentication: ${authAccount}`);

  if (!authAccount) {
    /* Authentication fails... */
    res.json(null);
    return;
  }

  const accessToken = jwt.sign(authAccount, process.env.ACCESS_TOKEN_SECRET, JSON.parse(process.env.ACCESS_TOKEN_GEN_OPTIONS))
  const refreshToken = jwt.sign(authAccount, process.env.REFRESH_TOKEN_SECRET, JSON.parse(process.env.REFRESH_TOKEN_GEN_OPTIONS));

  res
    .cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, JSON.parse(process.env.REFRESH_TOKEN_COOKIE_GEN_OPTIONS))
    .json({ accessToken });
};

exports.refreshToken = async (req, res) => {
  try {
    const cookieRefreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];

    if (!cookieRefreshToken) {
      throw new Error('Refresh Token Not Exist in Cookie');
    }

    const verified = await jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { iat, exp, ...account } = verified;

    const accessToken = jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, JSON.parse(process.env.ACCESS_TOKEN_GEN_OPTIONS));
    const refreshToken = jwt.sign(account, process.env.REFRESH_TOKEN_SECRET, JSON.parse(process.env.REFRESH_TOKEN_GEN_OPTIONS));

    res
      .header({ 'X-Mypofol-Refresh-Token-At': new Date().toUTCString() })
      .cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, JSON.parse(process.env.REFRESH_TOKEN_COOKIE_GEN_OPTIONS))
      .json({ accessToken });

  } catch (err) {
    // Empty, Invalid, Expired
    //
      // JWT 구현 플로우 상 에러 아닌데 화면에 에러 로그 터져서 오해 할까바 주석 처리
      // 파일 로그로 남기는 좋은데
      // 아! morgan / winston 로그 처리 알려 주겠씀
      // 
      // console.error(err);
    return res.json(null)
  }
}
