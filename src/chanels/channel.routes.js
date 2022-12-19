const controller = require("./channel.ctrl");

module.exports.config = function (app) {
    app.post("/chanel/add",passport.authenticate('jwt', { session: false }),controller.create);
    //  app.get("/chanel/:id", controller.findByPk);
    app.get("/chanel/all", controller.findAll);
    app.put("/chanel/update", controller.update);
    app.delete("/chanel/delete", controller.delete);
};