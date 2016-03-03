var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(require('../mongodbcon.js'));

var urlSchema = new Schema({
    original: {type: String, required: true},
    shortened: {type: String, required: true, unique: true}
    });

var Url = mongoose.model('linksprod', urlSchema);


//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
//app.use(express.logger('dev'));


router.get('/', function(req, res){
    
    res.render('urlshorten.jade');
    
})



router.get('/new/*', function(req, res){
    
    var regex = /^(?:(?:(?:https?|ftp?):)?\/?\/?)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/g
    var userUrl = req.params[0];
    
    if (!userUrl.match(regex)){
        res.send("Please send a valid Url. www.example.com")
    } else {
        if (!/^https?:\/\//i.test(userUrl)) {
            userUrl = 'http://' + userUrl;
            }
       var query = Url.find({original: userUrl}) 
        query.exec(function(err, link){
            if (err){throw err}
            //if the link exists, send them the already existing original and link info
            if (link.length > 0){
                res.send({original: link[0].original, shortened: link[0].shortened})
                } else {
               var shortened = Math.random().toString(36).substr(13).toUpperCase();
               var newUrl = new Url({
                 original: userUrl,
                  shortened: shortened
                    })
                    newUrl.save(function(err){
                        if (err){ throw err}
                      console.log("saved successfully")
                      console.log(newUrl);
                      res.send({"original": newUrl.original, "shortened": newUrl.shortened})
                  })
                }
            })
            
    
        
    } 
    
    
})

router.get('/:link', function(req, res){
    var shortenedUrl = req.params.link;
    console.log("shortenedurl = " + shortenedUrl)
    var query = Url.find({shortened: shortenedUrl});
    query.exec(function(err, link){
        if (err){throw err}
        if (!link.length){res.send("Invalid Link")
            
        } else {
            console.log("redirecting to " + link[0].original);
            res.redirect(302, link[0].original)
        }
    })
    
})

module.exports = router;
