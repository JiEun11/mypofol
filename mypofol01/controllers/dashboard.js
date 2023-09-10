const modelProfile = require('../models/profile');
module.exports = {
    profile: async (req, res, next) => {
      try {
        const profile = await modelProfile.findByAccountId(req.session.authAccount.id);
        console.log('profile >>>> ', profile);
        res.status(200).render('dashboard/profile', {
          profile
        });
      } catch (error) {
        next(error)
      }
      

        res.status(200).render('dashboard/profile');
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