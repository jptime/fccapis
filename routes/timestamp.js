var express = require('express'),
    router = express.Router();
    
    
//API Functions for Timestamp API

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

router.get('/', function(req, res){
    
    
})
router.get('/:date', function(req, res){
    var userDate = req.params.date;
    var date;
    if (!!Number(userDate)){ 
         date = new Date(Number(userDate) * 1000)
        
    } else{
         date = new Date(userDate);

    }
    var sentDate = {};
        sentDate.unix = null;
        sentDate.natural = null;
    
    if (date == "Invalid Date"){
        res.send(sentDate)
    }
        sentDate.unix = Date.parse(date) / 1000;
        sentDate.natural = month[date.getMonth()] + " " + date.getDate() + "," + " " + date.getFullYear();
   
        res.send(sentDate)
    
})

module.exports = router;