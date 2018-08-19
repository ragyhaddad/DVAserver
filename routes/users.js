var express = require('express');
var router = express.Router();
var geoConverter = require("../controllers/jobSubmitter.js");
var path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('users');
});



router.get('/loadSamples',function(req,res){
	
});

router.post('/runClustNum',function(req,res){
	console.log(req.body.sampleNumber);
	var sampleNumber = req.body.sampleNumber;
	geoConverter.runClustNumPy(req,res,'fileInput',sampleNumber);
});

router.post('/runClustVal',function(req,res){
	console.log(req.body.pValue);
	var pValue = req.body.pValue;
	geoConverter.runClustValPy(req,res,'fileInput',pValue);
});
router.post('/runAPIpath',function(req,res){
	console.log(req.body);
	geoConverter.runAPIpath(req,res,req.body);
});
router.get('/getJson/:ID',function(req,res){
	var appDir = path.dirname(require.main.filename);
	console.log(appDir);
	var ID = req.params.ID;
	res.status(200).sendFile(`${appDir}/storage/${ID}/temp_output.csv.cluster`);
});



module.exports = router;
