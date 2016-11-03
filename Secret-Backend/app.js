var express = require("express");
var DB = require("./DB");
var app = express();
var path = require("path");
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var PORT = process.env.PORT || 8080;

/*
 Get a random secret as per the given criteria.
 Get random secret if no criteria is passed.
 Search the secrets and return the top X secrets having the keyword if passes.
*/
app.get("/secret", function (req, res) {
    var keyword = req.query.keyword;
    if (keyword) {
        console.log("keyword found " + keyword);
        //Search for the keyword in the secrets
        DB.getSecretWithKeyWord(10, keyword, function (error, secrets) {
            if (error) {
                res.json({"error": true, "message": error});
            } else {
                res.json(secrets);
            }
        });
    } else {
        //Get a random secret
        DB
            .getRandomSecret(function (error, secret) {
                if (error) {
                    res.json({"error": true, "message": error});
                } else {
                    res.json(secret);
                }
            });
    }
});

app.get("/trending", function (req, res) {
    DB
        .getTopTrendingSecret(10, function (err, data) {
            if (err) {
                res.json({"error": true, "message": error});
            } else {
                res.json(data);
            }
        });
});

// Post a new secret. Store the secret text and initialize the comments and
// likes/dislikes to 0
app.post("/newsecret", function (req, res) {
    var secretText = req.body.secret;
    DB.postNewSecret(secretText, function (error, secret) {
        if (error) {
            res.json({"error": true, "message": error});
        } else {
            res.json({"success": true, "id": secret._id});
        }
    })
});

app.post("/likeDislikeSecret", function (req, res) {
    var id = req.body.id;
    var type = req.body.type;
    DB.likeDislikeSecret(id, type, function (error, updatedSecret) {
        if (error) {
            res.json({"error": true, "message": error});
        } else {
            res.json(updatedSecret);
        }
    });
});

app.post("/postComment", function (req, res) {
    var id = req.body.id;
    var comment = req.body.comment;
    DB.postComment(id, comment, function (error, updatedSecret) {
        if (error) {
            res.json({"error": true, "message": error});
        } else {
            res.json(updatedSecret);
        }
    });
});

app.listen(PORT, function () {
    console.log("Server started at port " + PORT);
});