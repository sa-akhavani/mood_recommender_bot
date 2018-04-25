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