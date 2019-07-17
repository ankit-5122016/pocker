const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
let db=null;

/* Creating Database Connection */
MongoClient.connect('mongodb+srv://admin:admin@cluster0-cryvl.mongodb.net/test?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err
  else console.log('Database connected......');
  db = client.db('pocker');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*For getting all score list*/
router.get('/getinfo', function(req, res, next) {
  db.collection('score').find().toArray(function (err, result) {
    if (err) throw err;
    else{
      res.json(result);
    }
  })
});
/* Upsert Document in Database*/
router.post('/upsert', function(req, res, next) {
  db.collection('score').insertOne({ score: req.body.score, result: req.body.result })
});
module.exports = router;