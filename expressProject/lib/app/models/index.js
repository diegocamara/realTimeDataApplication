"use strict";
var loader = require('../../util/loader');
var path = require('path');
<<<<<<< HEAD
var env = process.env.NODE_ENV || 'development';
=======
var env = process.env.NODE_ENV || 'localhost';
>>>>>>> f2b9de54f589d54eb4ddc45aa69e683d1579a9bb
var config = require('./databaseconfig.json')[env];
var uriUtil = require('mongodb-uri');
var mongoose = require('mongoose');

var mongodbUri = config.storage;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, config.options);
var db = {};

loader(__dirname, function(file){
  var model = require(path.join(__dirname, file));
  db[model.modelName] = model;
});

db.mongoose = mongoose;

module.exports = db;
