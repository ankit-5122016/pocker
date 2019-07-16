var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
let db=null;
MongoClient.connect('mongodb+srv://admin:admin@cluster0-cryvl.mongodb.net/test?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err

  else console.log('111111111111111111');
  db = client.db('pocker');


})
/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('score').find().toArray(function (err, result) {
    if (err) throw err;
    else{
      console.log(result[0].score)
      res.render('index');
    }
  })
});

module.exports = router;


// mongodb+srv://admin:admin@cluster0-cryvl.mongodb.net/test?retryWrites=true&w=majority






