const modelProfile = require('../models/profile');
module.exports = {
    profile: async (req, res, next) => {
      try {
        const profile = await modelProfile.findByAccountId(req.session.authAccount.id);
        res.status(200).render('dashboard/profile', {
          profile
        });
      } catch (error) {
        next(error);
      }
        res.status(200).render('dashboard/profile');
    },
    updateProfile: async (req, res, next) => {
      try{
        console.log('update >>>>> ', req.body.profile);
        const accountId = req.session.authAccount.id;
        const profile = req.body.profile;
        const update = await modelProfile.updateByDefault(accountId, profile);
        console.log("update value >>>> " , update);
      }catch(error){
        next(error);
      }
      res.redirect('/dashboard');  // update도 insert처럼 redirect가 맞는거겠지요,,?
      // res.status(200).render('/dashboard');
    },
    experiences: (req, res, next) => {
        res.status(200).render('dashboard/experiences');
    },
    educations: (req, res, next) => {
        res.status(200).render('dashboard/educations');
    },
    trainings: (req, res, next) => {
        res.status(200).render('dashboard/trainings');
    },
    skills: (req, res, next) => {
        res.status(200).render('dashboard/skills');
    }
}