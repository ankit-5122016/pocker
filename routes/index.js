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
  res.render('index');
});

router.get('/getinfo', function(req, res, next) {
  console.log('3333333333333333333333333322222222223')
  db.collection('score').find().toArray(function (err, result) {
    if (err) throw err;
    else{
      console.log(typeof result)
      res.json(result);
    }
  })
});

router.post('/upsert', function(req, res, next) {
  console.log('33333111111111111111111111111111111111111133333333333333333333322222222223')
  console.log(req.params)
  console.log(req.body.result)
 /* db.collection('score').find().toArray(function (err, result) {
    if (err) throw err;
    else{
      console.log(typeof result)
      res.json(result);
    }
  })*/

  db.collection('score').insertOne(
      { score: req.body.score, result: req.body.result }
  )
});
module.exports = router;


// mongodb+srv://admin:admin@cluster0-cryvl.mongodb.net/test?retryWrites=true&w=majority






