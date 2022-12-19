const model = require("./chat.model");
const errorMessage = `Une erreur s'est produite veuillez réessayez .`
const _ = require('lodash');



exports.create = async (req, res) => {
    try {
        const message = `La conversation a bien été créer.`
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
exports.delete = async (req, res) => {
    try {
        const message = `La conversation a bien été supprimer.`
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
        const message = `La conversation a bien été modifier.`
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
        const message = `La liste des conversations a bien été récupérer.`
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

exports.findListeBy = async (req, res) => {
    try {
        const message = `La liste des conversations de l'agent a bien été récupérer.`
        var records = await model.findListBy(req.body);
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
        const message = `une conversation a bien été retrouver.`
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


exports.assigned_to_users = async (req, res) => {
    try {
        const message = `L'utulisateurs  a bien été assigné.`
        var records = await model.assigned_to_users(req.body);
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

exports.openChat = async (req, res) => {
    try {
        
        var records = await model.openChat(req.body);
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

exports.closeChat = async (req, res) => {
    try {
        const message = `La conversation a bien été fermé.`
        var records = await model.closeChat(req.body);
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