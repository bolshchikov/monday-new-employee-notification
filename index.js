const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 1337;

app.use(bodyParser.json());

app.post('/parse', (req, res) => {
  res.send(req.body);
});
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`The app is running at ${PORT}`));
