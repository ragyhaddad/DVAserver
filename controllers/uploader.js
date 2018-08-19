var multer = require("multer");
var express = require("express");
var shell = require('shelljs');
var mkdirp = require('mkdirp');

/* Uploader Controller */
module.exports.startUploader = function (directoryName) {
	shell.exec("mkdir storage/"+directoryName);
	var storage = multer.diskStorage({
 		destination: function (req, file, cb) {
    		cb(null, "uploads/"+email);
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.originalname)
  		}
	});
	var upload = multer({ storage: storage });
	return upload;
}
