const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

module.exports = (app) => {
  
  const whitelist = [
    'http://localhost:4000',
    'http://localhost:3000',
  ];

  const corsOptions = {
    origin : function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('error: CORS problem!')
        callback(new Error('Not allowed by CORS'));
      }
    }
  };

  app.use(cors(corsOptions));
  
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({
    extended : true
  }));

  require('./routes/indexData')(app);
  require('./routes/search')(app);
  require('./routes/delete')(app);

  return app;
};
