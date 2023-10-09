const { modelSkill } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const skills = await modelSkill.findByAccountId(req.account.id);
    const skillsJson = skills.reduce((result, skill) => {
      skill.skillSet in result || (result[skill.skillSet] = []);
      result[skill.skillSet].push(skill);
      return result;
    }, {});
    res.json(skillsJson);
  } catch (error) {
    next?.(error);
  }
};
