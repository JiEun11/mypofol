const modelUser = require("../models/user");
const modelSkill = require("../models/skill");
const modelProject = require("../models/project");
const modelContact = require("../models/contact");

module.exports = {
    index: (req, res, next) => {
        res.status(200).render('main/index');
    },
    accountLanding: async (req, res, next) => {
       try {
            const profile = await modelUser.findByAccount(req.params.account);

            if(!profile) {
                res.status(404).render('error/404');
                return;
            }

            const skills = await modelSkill.findByUserId(profile.id);
            const contacts = await modelContact.findByUserId(profile.id);
            const projectCategories = await modelProject.findCategoryByUserId(profile.id);
            const projects = await modelProject.findByUserId(profile.id);

            res.status(200).render('main/accountHome', {
                profile,
                skills: skills.reduce((result, skill) => {
                    (skill.skillSet in result) || (result[skill.skillSet] = []);
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