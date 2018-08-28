const express = require('express');
const bodyParser = require('body-parser');
const { extractName } = require('./message-parser');

const app = express();

const PORT = process.env.PORT || 1337;

const start = () => {
  app.use(bodyParser.json());

  app.post('/parse', (req, res) => {
    const { subject, body } = req.body;
    const name = extractName(subject);
    res.send({
      name
    });
  });

  app.get('/ping', (req, res) => res.send('pong'));

  app.listen(PORT, () => console.log(`The app is running at ${PORT}`));
};

module.exports = {
  start
};
