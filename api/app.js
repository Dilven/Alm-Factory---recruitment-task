require('dotenv').config();
const express = require('express');

let app = express();

module.exports = require('./server')(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
