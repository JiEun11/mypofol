const { modelProject } = require("../models");

exports.create = async (req, res, next) => {
    try {
        const result = await modelProject.insert(Object.assign({}, req.body, {
            accountId: req.account.id,
        }));

        res.json(Object.assign({}, req.body, {
            id: result.insertId
        }));
    } catch (error) {
        next?.(error);
    }
};

exports.get = async (req, res, next) => {
    try {
        const projects = await modelProject.findByAccountId(req.account.id);
        res.json(projects);
    } catch (error) {
        next?.(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const project = Object.assign(req.body.project, {
            accountId: req.session.authAccount.id,
        });

        await modelProject.update(project);
        res.json(project);
    } catch (error) {
        next(error)
    }
};

exports.delete = async (req, res, next) => {
    try {
        await modelProject.delete(req.query.id, req.account.id);
        res.json(req.query.id);
    } catch (error) {
        next?.(error);
    }
};