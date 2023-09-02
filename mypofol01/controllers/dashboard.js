module.exports = {
    profile: (req, res, next) => {
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
    },
    educations: (req, res, next) => {
        res.status(200).render('dashboard/educations');
    }
}