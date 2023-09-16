const modelUser = require('../models/account');
const modelSkill = require("../models/skill");
const modelProject = require('../models/project');

module.exports = {
    profile: (req, res, next) => {
        res.status(200).render('account/profile');
    },
    
    experiences: (req, res, next) => {
        res.status(200).render('account/experiences');
    },

    educations: (req, res, next) => {
        res.status(200).render('account/educations');
    },

    trainings: (req, res, next) => {
        res.status(200).render('account/trainings');
    },

    skills: async (req, res, next) => {
      try {
        const skills = await modelSkill.findByAccountId(req.account.id);
        res.status(200).render('account/skills', {
          skills: skills.reduce((result, skill) => {
            (skill.skillSet in result) || (result[skill.skillSet] = [])
            result[skill.skillSet].push(skill);
            return result;
          }, {})
        });
      } catch (error) {
        next(error);
      }        
    },

    projects: async (req, res, next) => {
      try {
        const projects = await modelProject.findByAccountId(req.account.id);
        res.status(200).render('account/projects', {
          projects
        });
      } catch(err) {
        next(err);
      }
    }
}