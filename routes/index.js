var express = require('express');
var router = express.Router();
var multer = require("multer");
var uploadModule = require("../controllers/uploader.js");
var geoConverter = require("../controllers/jobSubmitter.js");
var upload = uploadModule.startUploader('sessionId');
var uniqid = require('uniqid');
var shell = require('shelljs');
var path = require('path');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'DVA PROJECT', samples:"",accession:"",message:"" });
});
router.gewt

/* loadSamples */
router.post('/upload',upload.array("files",12), function(req,res){
	console.log(req.files);
	console.log(req.body);
	console.log(req.body.accessionInput)
	console.log(req.body.accessionInput);
	geoConverter.executeR(req,res,req.body.accessionInput);
});
// router.post('/accessionInput',function(req,res){
// 	console.log(req.body);
// });
router.get('/dev',function(req,res){
	res.render('pathwayList',{jobID:'1gqsqti5fjgh52co3'});
});

/* Go */
router.post('/analyzeGroups/:accession', function(req,res){
	var groupNames = Object.keys(req.body);
	console.log('>>>>>>>>>>>>>' +req.params.accession);
	console.log(groupNames);
	var inputString = "";
	var accession = req.params.accession;
	console.log('>>>>>>>>>>>> accession' +accession);
	for (var x=0; x<groupNames.length; x++){
		console.log(groupNames[x]);
		console.log(req.body[groupNames[x]]);
		var arr = req.body[groupNames[x]];
		for (var y=0; y<req.body[groupNames[x]].length; y++ ){
			console.log(y);
			inputString = inputString +req.body[groupNames[x]][y]+":"+ groupNames[x]+",";
		}
	}
	console.log(inputString);
	console.log(accession);
	geoConverter.differentialExp(req,res,inputString,accession);
});

/* Pathways */
router.get('/sendPathways/:fileID',function(req,res){
	var appDir = path.dirname(require.main.filename);
	var jobID = req.params.fileID;
	res.sendFile(`${appDir}/storage/${jobID}/1.html`);
});
router.get('/switchPathways/:jobID/:number',function(req,res){
	var appDir = path.dirname(require.main.filename);
	var jobID = req.params.jobID;
	var number = req.params.number;
	res.sendFile(`${appDir}/storage/${jobID}/${number}.html`);
});

router.get('/noPathway',function(req,res){
	res.render('noPathway');
});

router.get('/pathwayList/:jobID',function(req,res){
	var jobID = req.params.jobID;
	res.render('pathwayList',{jobID:jobID});
});

module.exports = router;
