const controller = require("./users_ctrls");

module.exports.config = function (app) {
    app.post("/user/add", controller.create);
    // app.get("/user/:id", controller.findByPk);
    app.get("/user/all", controller.findAll);
    app.put("/user/update", controller.update);
    app.delete("/user/delete", controller.delete);
    app.post("/user/login", controller.login);
    app.post("/user/me", controller.getProfile)
    app.put("/user/change_password", controller.changePassword);


}