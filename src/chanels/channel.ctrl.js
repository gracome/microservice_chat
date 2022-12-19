const model = require("./channel.models");
const errorMessage = `Une erreur s'est produite veuillez réessayez .`
const _ = require('lodash');

exports.create = async(req,res) => {
    try {
        const message = `Le channel a bien été créer.`

        var records = await model.create(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error:errorMessage })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })

       
        }
}
exports.delete = async (req, res) => {
    try {
        const message = `Le channel a bien été supprimer.`

        var records = await model.delete(req.body);
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
exports.update = async (req, res) => {
    try {
        const message = `Le channel a bien été modifier.`

        var records = await model.update(req.body);
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

exports.findAll = async (req, res) => {
    try {
        const message = `La liste des canaux a bien été retrouver.`

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
        const message = `un canal a bien été retrouver.`

        var records = await model.findByPK(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: message })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage })

      
        }
}
