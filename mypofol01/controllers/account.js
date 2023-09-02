const modelUser = require('../models/user');
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
        const profile = await modelUser.findByAccount(req.params.account);

        if(!profile){
          res.status(404).render('error/404');
          return;
        }
        const skills = await modelSkill.findByUserId(profile.id);
        res.status(200).render('account/skills', {
          profile,
          skills: skills.reduce((result, skill) => {
            console.log("result ", result);
            console.log("skill ", skill);
            (skill.skillSet in result) || (result[skill.skillSet] = [])
            result[skill.skillSet].push(skill);
            return result;
          }, {})
        });
      } catch (error) {
        
      }
        
    },
    projects: async (req, res, next) => {
      try{
        const profile = await modelUser.findByAccount(req.params.account);

        if(!profile){
          res.status(404).render('error/404');
          return;
        }
        const projects = await modelProject.findByUserId(profile.id);
        res.status(200).render('account/projects', {profile, projects});
      }catch(err){
        next(err);
      }
    }
}