var express = require('express'),
    router = express.Router();
var Search = require('bing.search');
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var acctkey = require('../searchkey.js')

var imgSchema = new Schema({
    term: {type: String, required: true},
    when: {type: String, required: true}
    });

var ImgSearch = mongoose.model('imagesearch', imgSchema);


router.get('/', function(req, res){
    
    res.render('imagesearch.jade');
    
})


router.get('/latest', function(req, res){

  var query = ImgSearch.find().sort({when:-1}).limit(10);

  query.exec(function(err, docs) { 
    if (err){throw err}
    res.send(docs)
    
  });
})



router.get('/search/*', function(req,res){
    
    var usersearch = req.params[0];
    var userOffset = req.query.offset || 0;
    var timeNow = new Date();
    search = new Search(acctkey);

    search.images(usersearch,
      {top: 5, skip: userOffset},
      function(err, results) {
        res.send(results)
      }
    );
    
    var newImage = new ImgSearch({
      term: usersearch,
      when: timeNow
    });
    newImage.save(function(err){
      if (err){ throw err}
      console.log("saved successfully")
      console.log(newImage);
    })
    
})

module.exports = router;