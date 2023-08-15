const modelExperience = require("../models/experience");
const modelEducation = require("../models/education");
const modelTraining = require("../models/training");
const modelSkill = require("../models/skill");
const modelProject = require("../models/project");
const modelContact = require("../models/contact");

module.exports = {
    experiences: async (req, res, next) => {
        try {
            const experiences = await modelExperience.findByUserId(req.params.userid);
            
            res
            .status(200)
            .json(experiences);
        } catch(err){
            next && next(err);
        }
    },
    educations: async (req, res, next) => {
        try {
            const educations = await modelEducation.findByUserId(req.params.userid);
            
            res
            .status(200)
            .json(educations);
        } catch(err){
            next && next(err);
        }
    },
    trainings: async (req, res, next) => {
        try {
            const trainings = await modelTraining.findByUserId(req.params.userid);
            
            res
            .status(200)
            .json(trainings.reduce((result, training) => {
                (training.type in result) || (result[training.type] = []);
                result[training.type].push(training);

                return result;
            }, {}));
        } catch(err){
            next && next(err);
        }
    },
    skills: async (req, res, next) => {
        try {
            const skills = await modelSkill.findByUserId(req.params.userid);
            
            res
            .status(200)
            .json(skills.reduce((result, skill) => {
                (skill.skillSet in result) || (result[skill.skillSet] = []);
                result[skill.skillSet].push(skill);

                return result;
            }, {}));
        } catch(err){
            next && next(err);
        }
    },
    projects: async (req, res, next) => {
        try {
            const projectCategories = await modelProject.findCategoryByUserId(req.params.userid);
            const projects = await modelProject.findByUserId(req.params.userid);
            
            res
            .status(200)
            .json({
                projectCategories,
                projects
            });
        } catch(err){
            next && next(err);
        }
    },
    contacts: async (req, res, next) => {
        try {
            const contacts = await modelContact.findByUserId(req.params.userid);
            
            res
            .status(200)
            .json(contacts);
        } catch(err){
            next && next(err);
        }
    },

}