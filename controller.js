const Recom = require('./recommendation');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  find: (tag) => {
    return new Promise((resolve,reject) => {
      Recom.find({tag}).then((recoms) => {
        resolve(recoms[getRandomInt(recoms.length)]);
      }).catch(reject);
    });
  },
  findTags: () => {
    return new Promise((resolve,reject) => {
      Recom.aggregate([
        {
          $group: {
            _id:"$tag",
            count:{
              $sum:1
            }
          }
        },
        {
          $project:{
            tag: "$_id",
            count: 1
          }
        },
        {
          $sort:{
            count:-1
          }
        }
      ],function(err, recoms) {
        if(!err)
          resolve(recoms.slice(0,5));
        else
          reject(err);
      });
    });
  },
  create: (recom) => {
    return new Promise((resolve, reject) => {
      Recom.create(recom, (err, newRecom) => {
        if (err)
          reject(err);
        else
          resolve(newRecom);
      });
    });
  }
};