var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    upload = multer();
    
    
router.get('/', function(req, res){
    
    res.render('filemetadata.jade');
    
})


router.post('/', upload.single('upl'), function(req,res){
   
   res.send(req.file)
    
})


module.exports = router;