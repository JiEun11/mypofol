const modelAccount = require('../models/account');
const modelProfile = require('../models/profile');

module.exports = {
  index: (req, res, next) => {
    if (req.session.authAccount) {
      next && next();
      return;
    }
    res.status(200).render('main/landing', { theme: '' });
  },

  welcome: (req, res, next) => {
    res.status(200).render('main/landing', { theme: 'welcome' });
  },

  signin: (req, res, next) => {
    if (req.session.authAccount) {
      res.redirect("/dashboard");
      return;
    }
    res.status(200).render('main/signin');
  },

  signup: async (req, res, next) => {
    try {

      const accountId = await modelAccount.insert(req.body.account);
      await modelProfile.insertByDefault(accountId);

      res.redirect("/welcome");
    } catch (error) {
      next && next(error);
    }
  },
  signout: async (req, res, next) => {
    try {
      await req.session.destroy();
      res.redirect('/')
    } catch (error) {
      next && next(error)
    }
  },

  auth: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const authAccount = await modelAccount.findByEmailAndPassword(email, password);

      if (!authAccount) {
        res.status(200).render('main/landing', { theme: '', email });
        return;
      }
      req.session.authAccount = authAccount;
      res.redirect('/');
    } catch (error) {
      next && next(error);
    }
  },

  uploadProfilePic: async function (req, res, next) {
    try {
      const file = req.file;

      if (!file) {
        throw 'upload file empty';
      }

      const content = fs.readFileSync(file.path);

      const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.UPLOADIMAGE_STORE_LOCATION);
      const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname);
      const url = path.join(process.env.UPLOADIMAGE_STORE_LOCATION, file.filename) + path.extname(file.originalname);

      fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
      fs.writeFileSync(storePath, content, { flag: 'w+' });
      fs.unlinkSync(file.path);

      res.status(200).json({ url });
    } catch (error) {
      next(error);
    }
  }
}