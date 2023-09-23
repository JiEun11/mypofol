const modelProfile = require("../../models/profile");
const modelExperience = require("../../models/experience");
const modelEducation = require("../../models/education");
const modelProject = require("../../models/project");

module.exports = {
  profile: async (req, res, next) => {
    try {
      const profile = await modelProfile.findByAccountId(req.account.id);
      res.status(200).json(profile);
    } catch (err) {
      next(err);
    }
  },

  experiences : async (req, res, next) => {
    try {
      const experiences = await modelExperience.findByAccountId(req.account.id);
      res.status(200).json(experiences);
    } catch (err) {
      next(err);
    }
  },

  educations : async (req, res, next) => {
    try {
      const educations = await modelEducation.findByAccountId(req.account.id);
      res.status(200).json(educations);
    } catch (err) {
      next(err);
    }
  },

  projects: async (req, res, next) => {
    try {
      const projects = await modelProject.findByAccountId(req.account.id);
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  },

  insertProject: async (req, res, next) => {
    const result = await modelProject.insert(Object.assign({}, req.body, {
      accountId: req.account.id,
    }));
    
    res.status(200).json(Object.assign({}, req.body, { 
      id: result.insertId 
    }));
  },

  deleteProject: async (req, res, next) => {
    console.log(req.query.id);
    await modelProject.delete(req.query.id, req.account.id);
    res.status(200).json(req.query.id);
  }
};
