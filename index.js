const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;

app.post('/parse', (req, res) => res.send(200));
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log('Example app listening on port 3000!'));
