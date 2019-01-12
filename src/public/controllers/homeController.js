var bodyParser = require("body-parser");


module.exports  = function(app) {

    app.get("/home", function(req, res) {
        res.render("home");
    })

    app.get("/", function(req, res) {
        res.render("home");
    })

};