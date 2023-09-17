const modelProfile = require("../models/profile");
const modelProject = require("../models/project");
const fs = require('fs');
const path = require('path');

module.exports = {
  profile: async (req, res, next) => {
    try {
      const profile = await modelProfile.findByAccountId(
        req.session.authAccount.id
      );
      res.status(200).render("dashboard/profile", {
        profile,
      });
    } catch (error) {
      next(error);
    }
  },
  
  updateProfile: async (req, res, next) => {
    try {
      const profile = Object.assign(req.body.profile, {
        accountId: req.session.authAccount.id,
      });
      const update = await modelProfile.update(profile);

      res.redirect("/dashboard");
    } catch (error) {
      next(error);
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
  },

  experiences: (req, res, next) => {
    res.status(200).render("dashboard/experiences");
  },
  educations: (req, res, next) => {
    res.status(200).render("dashboard/educations");
  },
  trainings: (req, res, next) => {
    res.status(200).render("dashboard/trainings");
  },
  skills: (req, res, next) => {
    res.status(200).render("dashboard/skills");
  },
  projects: async (req, res, next) => {
    try {
      const projects = await modelProject.findByAccountId(
        req.session.authAccount.id
      );
      res.status(200).render("dashboard/projects", {
        projects,
      });
    } catch (error) {
      next(error);
    }
  },

  insertProject: async (req, res, next) => {
    try { 
      const project = Object.assign(req.body.project, {
        accountId: req.session.authAccount.id,
      });

      await modelProject.insert(project);
      res.redirect('/dashboard/projects')
    } catch (error) {
      next(error);
    }
  },

  updateProject: async (req, res, next) => {
    try {
      const project = Object.assign(req.body.project, {
        accountId: req.session.authAccount.id,
      });

      await modelProject.update(project);
      res.redirect('/dashboard/projects')
    } catch (error) {
      next(error)
    }
  },
  deleteProject: async (req, res, next) => {
    try {
      await modelProject.delete(req.query.id, req.session.authAccount.id);
      res.redirect('/dashboard/projects')
    } catch (error) {
      next(error)
    }
  }
};
