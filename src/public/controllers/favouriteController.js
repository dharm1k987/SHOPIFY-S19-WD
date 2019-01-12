var bodyParser = require("body-parser");
var index = require(__dirname + '/../../index');
var db = index.db;
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports  = function(app) {
    app.use(bodyParser.json());
    
    // create an account
    app.post("/fav", urlencodedParser, function(req, res) {
        console.log();
        db.find({"id": req.body.id}, function(err, docs){
            if (docs.length == 0) {
                // this means it does not exist, this is good
                console.log("nothing exists");
                db.insert( {"id": req.body.id}, function(err, docs){
                    console.log("inserted");
                });
                res.status(201);
                res.send({});
            } else {
                // it exists, remove it
                db.remove({ "id": req.body.id }, function (err, numRemoved) {
                    console.log("removed");
                });
                res.status(500);
                res.send({});
            }
        });
    })

    app.post("/checkFav", urlencodedParser, function(req, res) {

        db.find({"id": req.body.id}, function(err, docs){
            if (docs.length == 0) {
                // this means it does not exist, this is good
                res.status(200);
                res.send({});
            } else {
                res.status(500);
                res.send({});
            }
        });
    })
};