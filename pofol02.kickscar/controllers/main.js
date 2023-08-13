const modelUser = require("../models/user");
const modelExperience = require("../models/experience");
const modelEducation = require("../models/education");
const modelTraining = require("../models/training");
const modelSkill = require("../models/skill");
const modelContact = require("../models/contact");
const modelProject = require("../models/project");

module.exports = {
    index: (req, res, next) => {
        res.send('Main Page');
    },
    accountLanding: async (req, res, next) => {
       try {
            const profile = await modelUser.findByAccount(req.params.account);

            if(!profile) {
                res.status(404).render('error/404');
                return;
            }

            const experiences = await modelExperience.findByUserId(profile.id);
            const educations = await modelEducation.findByUserId(profile.id);
            const trainings = await modelTraining.findByUserId(profile.id);
            const skills = await modelSkill.findByUserId(profile.id);
            const contacts = await modelContact.findByUserId(profile.id);
            const projectCategories = await modelProject.findCategoryByUserId(profile.id);
            const projects = await modelProject.findByUserId(profile.id);

            res.status(200).render('main/index', {
                profile,
                experiences,
                educations,
                trainings: trainings.reduce((result, training) => {
                    (training.type in result) || (result[training.type] = [])
                    result[training.type].push(training);
                    return result;
                }, {}),
                skills: skills.reduce((result, skill) => {
                    (skill.skillSet in result) || (result[skill.skillSet] = [])
                    result[skill.skillSet].push(skill);
                    return result;
                }, {}),
                contacts: contacts.reduce((result, contact) => {
                    result[contact.means] = contact.details;
                    return result;
                }, {}),
                projectCategories,
                projects
            });

       } catch(err){
            next(err);
        }
    }
}