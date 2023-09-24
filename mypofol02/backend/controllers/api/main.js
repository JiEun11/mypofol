const modelAccount = require("../../models/account");
const modelProfile = require("../../models/profile");

const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const accountId = await modelAccount.insert(req.body);
      await modelProfile.insertByDefault(accountId);

      res.json(null);
    } catch (error) {
      next && next(error);
    }
  },

  signout: async (req, res, next) => {
    // clear cookie
    res
        .clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME)
        .json(null);
  },

  auth: async (req, res, next) => {
      console.log("req >>> ", req.body);
      const email = req.body.email;
      const password = req.body.password;
      const authAccount = await modelAccount.findByEmailAndPassword(
        email,
        password
      );
      
      console.log("authAccount >>> ", authAccount);

      const accessToken = jwt.sign(authAccount, process.env.ACCESS_TOKEN_SECRET, JSON.parse(process.env.ACCESS_TOKEN_GEN_OPTIONS))
      const refreshToken = jwt.sign(authAccount, process.env.REFRESH_TOKEN_SECRET, JSON.parse(process.env.REFRESH_TOKEN_GEN_OPTIONS));
      
      res
        .cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, JSON.parse(process.env.REFRESH_TOKEN_COOKIE_GEN_OPTIONS))
        .json({ accessToken });
  },

  refreshToken: async (req, res, next) => {
    try {
      const cookieRefreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];

      console.log(cookieRefreshToken);
      if(!cookieRefreshToken){
        throw new Error('Refresh Token Not Exist in Cookie');
      }

      const verified = await jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET );
      const {iat, exp, ...account} = verified;

      // 새로 발급
      const accessToken = jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, JSON.parse(process.env.ACCESS_TOKEN_GEN_OPTIONS));
      const refreshToken = jwt.sign(account, process.env.REFRESH_TOKEN_SECRET, JSON.parse(process.env.REFRESH_TOKEN_GEN_OPTIONS));

      res
      .header({'X-Mypofol-Refresh-Token-At': new Date().toUTCString() })
      .cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, JSON.parse(process.env.REFRESH_TOKEN_COOKIE_GEN_OPTIONS))
      .json({ accessToken });

    } catch (err) {
      console.error(err);
      return res.json(null)
    }
  }


};
