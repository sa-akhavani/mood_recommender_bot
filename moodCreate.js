/**
 * Created by hooman on 4/18/18.
 */
const recommend = require("./recommendation.js");
const App = require("./app");

let newMood  =  function (newMoodText, tags) {
    recommend.create({
        recom: newMoodText.toString(),
        tags:[tags]
    })
        .then(function (res) {
            return res;
        })
        .catch()
};

module.exports = function (text, tag) {
    newMood(text,tag);
};

exports.create = function(req, res) {
    Brands.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};