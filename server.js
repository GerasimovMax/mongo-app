const http = require('http');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const port = 8000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const server = http.createServer(app);

server.listen(port, () => {
  MongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    const db = client.db('database0');

    require('./app/routes')(app, db);
  });

  console.log('We are live on ' + port);
});