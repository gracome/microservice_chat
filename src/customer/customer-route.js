const controller = require("./customer-ctrl");

module.exports.config = function (app) {
    app.post("/customers/add", controller.create);
    app.get("/customers/:id", controller.findByPk);
    app.get("/customers/all", controller.findAll);
    app.put("/customers/update ", controller.update);
};