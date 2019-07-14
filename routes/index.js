var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// mongodb+srv://admin:admin@cluster0-cryvl.mongodb.net/test?retryWrites=true&w=majority


/*
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://admin:admin@cluster0-cryvl.mongodb.net/test?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err

  else console.log('111111111111111111');
  var db = client.db('sample_geospatial')

  db.collection('shipwrecks').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})
*/

