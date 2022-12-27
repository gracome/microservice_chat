const controller = require("./chat.ctrl");

module.exports.config = function (app) {
    app.post("/chat/add", controller.create);
     app.get("/chat/:id", controller.findByPk);
    app.get("/chat/all", controller.findAll);
    app.get("/chat/allbyAgent", controller.findListeBy);
    app.put("/chat/update", controller.update);
    app.delete("/chat/delete", controller.delete);
    app.put("/chat/openchat", controller.openChat);
    app.put("/chat/closechat", controller.closeChat);
    app.post("/user_chat/add", controller.assigned_to_users);

};