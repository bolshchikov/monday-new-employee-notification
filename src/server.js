const express = require('express');
const bodyParser = require('body-parser');
const { extractName } = require('./message-parser');
const { addNewHire } = require('./monday-integration');

const app = express();

const PORT = process.env.PORT || 1337;

const start = () => {
  app.use(bodyParser.json());

  app.post('/add', (req, res) => {
    const { subject, body } = req.body;
    const name = extractName(subject);
    addNewHire(name).then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.sendStatus(500);
    })
  });

  app.get('/ping', (req, res) => res.send('pong'));

  app.listen(PORT, () => console.log(`The app is running at ${PORT}`));
};

module.exports = {
  start
};
