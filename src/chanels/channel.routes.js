const controller = require("./channel.ctrl");
const passport= require("../../config/passport");

module.exports.config = function (app) {
    app.post("/chanel/add",controller.create);
     app.get("/chanel/find", controller.findByPk);
    app.get("/chanel/all", controller.findAll);
    app.put("/chanel/update", controller.update);
    app.delete("/chanel/delete", controller.delete);
};