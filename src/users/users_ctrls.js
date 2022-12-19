const model = require("./users_models");
const errorMessage = `Une erreur s'est produite veuillez réessayez .`
const _ = require('lodash');

exports.create = async (req, res) => {
    try {
        const message = `L'agent a bien été crée.`;
        var records = await model.create(req.body);
        if (!_.isNil(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })

    }
}

exports.delete = async (req, res) => {
    try {
        const message = `L'agent a bien été supprimer.`
        var records = await model.delete(req.body);
        if (!_.isNil(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })

    }
}
exports.update = async (req, res) => {
    try {
        const message = `L'agent a bien été modifier.`
        var records = await model.update(req.body);
        if (!_.isNil(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })


    }
}

exports.findAll = async (req, res) => {
    try {
        const message = `La liste des agents a bien été récuper.`
        var records = await model.findAll(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })
    }
}

exports.findByPk = async (req, res) => {
    try {
        const message = `un agent a bien été retrouver.`
        var records = await model.findByPk(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })

    }
}

exports.getProfile = async (req, res) => {
    try {
        var records = await model.getProfile(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })
    }
}

exports.login = async (req, res) => {

    try {
        let response = await model.login (req.body);
        res.json(response);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage });
    }
}
exports.changePassword = async (req, res) => {

    try {
        let response = await model.changePassword (req.body);
        res.json(response);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage });
    }
}