const modelUser = require('../models/user');
const modelProject = require('../models/project');

module.exports = {
    dashboard: (req, res, next) => {
        res.status(200).render('account/dashboard');
    },
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
    skills: (req, res, next) => {
        res.status(200).render('account/skills');
    },
    projects: async (req, res, next) => {
      try{
        const profile = await modelUser.findByAccount(req.params.account);

        if(!profile){
          res.status(404).render('error/404');
          return;
        }
        const projects = await modelProject.findByUserId(profile.id);
        console.log(profile , 'projects >>>> ', projects)
        res.status(200).render('account/projects', {profile, projects});
      }catch(err){
        next(err);
      }
    }
}