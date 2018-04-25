/**
 * Created by hooman on 4/18/18.
 */
const recommend = require("./recommendation.js");

let newMood = function (newMoodText, tag) {
    recommend.create({
        recom: newMoodText.toString(),
        tags: [tag]
    }, function (error, insertedObject) {
        if (!error) {
            return;
        } else {
            console.log('bgr');
            return;
        }
    });
};

module.exports = {
    newMood: newMood
}