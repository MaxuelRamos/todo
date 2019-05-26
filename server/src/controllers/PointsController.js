const imageDataURI = require('image-data-uri');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');
const AWS = require('aws-sdk');
const fs = require('fs');
const Point = require('../models/Point');
const db = require('../db/db');

const env = process.env.NODE_ENV.trim();

const onError = (error, res) => {
  console.error(error);
  res.status(500).send({ message: 'Ocorreu um erro durante a operação' });
};

const createPoint = (point, req, res) => {
  Point.create(point)
    .then((newPoint) => {
      res.json(newPoint);
    })
    .catch((error) => {
      onError(error, res);
    });
};

module.exports = {
  async index(req, res) {
    let date = moment(req.query.date, 'YYYY-MM-DD');

    if (!date.isValid) {
      date = moment();
    }
    console.log(date.format('YYYY-MM-DD Z'));
    db.query(
      `select * from ponto.points
        where DATE(timestamp) = '${date.format('YYYY-MM-DD Z')}'
        AND "userId" = ${req.user.id}
        order by timestamp`,
      {
        model: Point,
        mapToModel: true, // pass true here if you have any mapped fields
      },
    )
      .then((pontos) => {
        res.json(pontos);
      })
      .catch(error => onError(error, res));
  },

  async registerPoint(req, res) {
    const now = moment().toDate();
    const imageDesc = `photos/${String(req.user.companyId)}/${String(
      req.user.id,
    )}/${String(now.getFullYear())}/${String(now.getMonth())}/${String(
      now.getDate(),
    )}`;
    const imageName = String(uuid());

    const imgPath = path.join('C:', 'point', 'files', imageDesc, imageName);

    const { dataUri, lat, long } = req.body;

    imageDataURI
      .outputFile(dataUri, imgPath)
      .then((result) => {
        if (env === 'development') {
          const point = {
            userId: req.user.id,
            lat,
            long,
            imgPath: result,
          };

          createPoint(point, req, res);
          return;
        }

        const s3 = new AWS.S3();

        const params = {
          Bucket: `ponto-dev-123/${imageDesc}`,
          Body: fs.createReadStream(result),
          Key: `${imageName}.png`,
        };

        s3.upload(params, (err, data) => {
          // handle error
          if (err) {
            onError(err, res);
          }

          // success
          if (data) {
            const point = {
              userId: req.user.id,
              lat,
              long,
              imgPath: data.Location,
            };

            createPoint(point, req, res);
          }
        });
      })
      .catch((error) => {
        onError(error, res);
      });
  },
};
