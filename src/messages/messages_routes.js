const controller = require("./messages_ctrls");

module.exports.config = function (app) {
    app.post("/messages/add", controller.create);
    app.get("/messages/:id", controller.findByPk);
    app.get("/messages/all", controller.findAll);
    app.put("/messages/update", controller.update);
    app.delete("/messages/delete", controller.delete);
    app.put("/messages/read", controller.readMessage);

};