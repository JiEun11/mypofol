const modelProject = require("../../models/project");

module.exports = {
  projects: async (req, res, next) => {
    try {
      const projects = await modelProject.findByAccountId(req.account.id);
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  },

  insertProject: async (req, res, next) => {
    const result = await modelProject.insert(Object.assign({}, req.body, {
      accountId: req.account.id,
    }));
    
    res.status(200).json(Object.assign({}, req.body, { 
      id: result.insertId 
    }));
  },

  deleteProject: async (req, res, next) => {
    console.log(req.query.id);
    await modelProject.delete(req.query.id, req.account.id);
    res.status(200).json(req.query.id);
  }
};