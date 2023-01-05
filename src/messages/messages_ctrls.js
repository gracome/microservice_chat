const model = require("./messages_models");
const errorMessage = `Une erreur s'est produite veuillez réessayez .`
const _= require('lodash')

exports.create = async (req, res) => {
    try {
        const message = `Le message a bien été crée.`

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

    var messages = new model(req.body);
    messages.save((err) =>{
      if(err)
        res.status(500);
      io.emit('message', req.body);
      res.status(200);
    })
}
exports.delete = async (req, res) => {
    try {
        const message = `Le message a bien été supprimer.`
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
        const message = `Le message a bien été modifier.`
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
        const message = `La liste des message a bien été récupérer.`
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
        const message = `un message a bien été retrouver.`
        var records = await model.findByPk(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage  })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage  })

     
    }
}

exports.findByChat = async (req, res) => {
    try {
        const message = `un message a bien été retrouver.`
        var records = await model.findByChat(req.body);
        if (_.isArray(records)) {
            res.json({ message, data: records })
        } else {
            res.json({ error: errorMessage  })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: errorMessage  })

     
    }
}
exports.readMessage = async (req, res) => {
    try {
        const message = `Le message a bien été lu.`
        var records = await model.readMessage(req.body);
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