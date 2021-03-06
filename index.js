var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var mongoose = require('mongoose');

// ** Setup API page with links using jade.
//

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.logger('dev'));


app.get('/', function(req, res){
    
    res.render('index.jade');
    res.end();
})

app.use('/api/timestamp', require('./routes/timestamp.js'));
app.use('/api/reqparser', require('./routes/reqparser.js'));
app.use('/api/urlshorten', require('./routes/urlshorten.js'));
app.use('/api/imagesearch', require('./routes/imagesearch.js'));
app.use('/api/filemetadata', require('./routes/filemeta.js'));

var server = app.listen(port, function(){

});