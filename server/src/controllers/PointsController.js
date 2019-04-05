const imageDataURI = require('image-data-uri');
const path = require('path');
const uuid = require('uuid');
const Point = require('../models/Point');

const onError = (error, res) => {
  console.log(error);
  res.status(500).send({ message: 'Ocorreu um erro durante a operação' });
};

module.exports = {
  async registerPoint(req, res) {
    const now = new Date();
    const imgPath = path.join(
      'C:',
      'point',
      'files',
      String(req.user.companyId),
      String(req.user.id),
      String(now.getFullYear()),
      String(now.getMonth()),
      String(now.getDate()),
      String(uuid()),
    );

    const { dataUri, lat, long } = req.body;

    imageDataURI
      .outputFile(dataUri, imgPath)
      .then((result) => {
        const point = {
          timestamp: new Date(),
          userId: req.user.id,
          lat,
          long,
          imgPath,
        };

        Point.create(point)
          .then((newPoint) => {
            res.json(newPoint);
          })
          .catch((error) => {
            onError(error, res);
          });
      })
      .catch((error) => {
        onError(error, res);
      });
  },
};
