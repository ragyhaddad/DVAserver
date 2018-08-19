var express = require("express");
var shell   = require("shelljs");
var router = express.Router();
var path = require('path');
const { spawn } = require('child_process'); 
var uniqid = require('uniqid');
var jobID = uniqid();
console.log('start ID ' +jobID);

/* Parse accession */
module.exports.executeR = function (req,res,accession) {
  var objectArray = [];
	var object = {};
  var child = shell.exec(`Rscript bin/determine_samples.R ${accession} acc`, {async:true});
	child.stdout.on('data', function(data) {
  		
  		var str="";
  		str += data.toString();
  		var lines= str.split("\n");
  		
  		for (var i in lines){
  			
  			var record = lines[i].split("\t");
  			console.log(record);
  			var recObject = {accession:record[0],sample:record[1],type:record[2],location:record[3]};
        console.log(recObject);
  			objectArray.push(recObject);
  			
  		}
  		console.log(objectArray);

	});
  child.on('close',(code)=>{
    if(code !=0){
      res.render('index', {title:'DVA PROJECT', samples:"",accession:"",message:"Invalid GSE Accession"});
    }
    else{
      res.render('index', {title:'DVA PROJECT', samples:objectArray,accession:accession,message:""});
    }
  })

}


module.exports.differentialExp = function (req,res,inputString,accession){
  var appDir = path.dirname(require.main.filename);
  var dir = shell.exec(`mkdir ${appDir}/storage/${jobID}`);
  var myaccession = accession;
  // var child_Origin = shell.exec(`Rscript bin/differential_expression.R GSE51612 acc "GSM1249165:group1,GSM1249166:group1,GSM1249167:group1,GSM1249170:group2,GSM1249171:group2,GSM1249172:group2" > ${appDir}/storage/${jobID}/temp_output.csv`);
  var child_Origin = shell.exec(`Rscript bin/differential_expression.R ${myaccession} acc "${inputString}" > ${appDir}/storage/${jobID}/temp_output.csv`,{async:true});
  child_Origin.on('close',(code)=>{
    catOutput();
  });
  function catOutput(){
    var child = shell.exec(`head -50 ${appDir}/storage/${jobID}/temp_output.csv | head -50`,{async:true});
    var myData = "";
    var recObject; 
    var objectArray = [];
    var str="";
    child.stdout.on('data', function(data){ 
        
        str += data.toString();
    
    });

    child.on('close', function(code){
      var lines = str.split('\n');
      for (var i in lines){
        var record = lines[i].split(',');
        var recObject = {probeID:record[0],genBank:record[1],geneSymbol:record[2],pValue:record[3]};
        objectArray.push(recObject);
      }
      console.log(objectArray);
      res.render('loadSamples',{samples:objectArray});
    });
  }  
}


module.exports.runClustNumPy = function(req,res,inputFile,sample_no,id){
    console.log('job ID at end ' +jobID);
    var appDir = path.dirname(require.main.filename);
    var clustJob = shell.exec(`python bin/dvaClust.py -i ${appDir}/storage/${jobID}/temp_output.csv -n ${sample_no}`,{async:true});
    var id = jobID;
    clustJob.on('close',(code)=>{
      res.render('dvaClust',{ID:id});
    })
    
}

module.exports.runClustValPy = function(req,res,inputFile,pVal,id){
    console.log('job ID at end ' +jobID);
    var appDir = path.dirname(require.main.filename);
    var clustJob = shell.exec(`python bin/dvaClust.py -i ${appDir}/storage/${jobID}/temp_output.csv -p ${pVal}`,{async:true});
    var id = jobID;
    clustJob.on('close',(code)=>{
      res.render('dvaClust',{ID:id});
    });
    
}

module.exports.runAPIpath = function(req,res,inputString){
    var appDir = path.dirname(require.main.filename);
    var mkdir = shell.exec(`mkdir ${appDir}/storage/${jobID}`) //123test
    var parseInput = shell.exec(`python bin/StringParser.py -s '${inputString}' > ${appDir}/storage/${jobID}/IDList.txt`);
    var runAPIpath = shell.exec(`bash ${appDir}/pathway/APIpath.sh -f ${appDir}/storage/${jobID}/IDList.txt -d ${appDir}/storage/${jobID}  -x ${appDir}/pathway`,{async:true});
    runAPIpath.on('close',(code)=> {
        if(code == 1){
            res.redirect('/noPathway');
        }
        else{

            res.redirect(`/pathwayList/${jobID}`);

        }
    });

    
    

}


