const Recom = require('./recommendation');

module.exports = {
  find: (tags) => {
    return Recom.find({
      tags: {
        $all: tags
      }
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