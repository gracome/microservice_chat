const model = require('../customer/customer-models')
const errorMessage = `Une erreur s'est produite veuillez réessayez .`
const _ = require('lodash')

exports.create = async (req, res) => {
    try {
        const message = `Le client a bien été crée.`
        var records = await model.create(req.body);
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
        const message = `Le client a bien été modifier.`
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
        const message = `la liste des clients a bien été retrouver.`
        var records = await model.findAll(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error:errorMessage })

    }
}

exports.findByPk = async (req, res) => {
    try {
        const message = `un client a bien été retrouver.`
        var records = await model.findByPk(req.body);
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
