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
    projects: (req, res, next) => {
      res.status(200).render('account/projects');
    }
}