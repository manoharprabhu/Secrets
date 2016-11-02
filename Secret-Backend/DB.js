var Database = (function () {
    var DataStore = require("nedb");
    var db = new DataStore({filename: "secrets", autoload: true});
    db.ensureIndex({
        fieldName: "secret"
    }, function (err) {
        if (err) {
            console.log("Error while creating index on the secret attribute");
        } else {
            console.log("Attribute 'secret' indexed successfully");
        }
    });

    function getRandomInt(limit) {
        return Math.floor(Math.random() * 100000) % limit;
    }

    RegExp.escape = function (s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var getRandomSecret = function (callback) {
        db
            .count({}, function (err, count) {
                if (err) {
                    callback(err);
                    return;
                }
                if (count === 0) {
                    callback(null, []);
                }
                var randomSkip = getRandomInt(count);
                db
                    .findOne({})
                    .skip(randomSkip)
                    .exec(function (err, doc) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, doc);
                        }
                    });
            });
    };

    var getSecretWithKeyWord = function (num, keyword, callback) {
        db
            .find({
            "secret": new RegExp(RegExp.escape(keyword))
        })
            .limit(num)
            .exec(function (err, docs) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, docs);
                }
            });
    };

    var getTopTrendingSecret = function (num, callback) {
        db
            .find({})
            .sort({"likes": -1, "dislikes": 1})
            .limit(num)
            .exec(function (err, docs) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, docs);
                }
            });
    };

    var postNewSecret = function (secretText, callback) {
        var document = {
            "secret": secretText,
            "comments": [],
            "likes": 0,
            "dislikes": 0
        };
        db.insert(document, function (err, newDocs) {
            callback(err, newDocs);
        });
    };

    return {getRandomSecret, getSecretWithKeyWord, getTopTrendingSecret, postNewSecret}

}());

module.exports = Database;