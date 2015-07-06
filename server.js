// server.js
//
// main entry point for a cloud-based firerating
// application, implemented as a node.js
// REST API driven mongoDB web server.
//
// Copyright 2015 by Jeremy Tammik, Autodesk Inc.

//// Data model
//
//// given: a Revit door element UniqeId;
//// it must obviously be unique in the database.
//
//var door_unique_id
//  = '60f91daf-3dd7-4283-a86d-24137b73f3da-0001fd0b';
//
//var Schema = mongoose.Schema,
//    ObjectId = Schema.ObjectId;
//
//var RvtUniqueId = String;
//
//var projectInstance = new ProjectModel();
//
//projectInstance.computername = 'JEREMYTAMMIB1D2';
//projectInstance.path = 'C:/Program Files/Autodesk/Revit 2016/Samples/rac_basic_sample_project.rvt';
//projectInstance.centralserverpath = '';
//projectInstance.title = 'rac_basic_sample_project.rvt';
//projectInstance.numberofsaves = 271;
//projectInstance.versionguid = 'f498e8b1-7311-4409-a669-2fd290356bb4';
//projectInstance.projectinfo_uid = '8764c510-57b7-44c3-bddf-266d86c26380-0000c160';
//
//projectInstance.save(function (err) {
//  console.log( 'save project returned err = ' + err );
//  if(!err) {
//    var pid = projectInstance._id;
//    console.log( 'project_id = ' + pid );
//
//    for( var i = 0; i < 10; ++i ) {
//      var inst = new DoorModel();
//      var s = i.toString();
//      inst._id = door_unique_id + s;
//      inst.project_id = pid;
//      inst.level = 'Level ' + s;
//      inst.tag = 'Tag ' + s;
//      inst.firerating = 123.45 * (i + 0.1);
//      inst.save(function (err) {
//        console.log( 'save instance returned err = ' + err );
//      });
//    }
//  }
//});

// Web server

var express = require('express');
var mongoose = require( 'mongoose' );

var mongo_uri = 'mongodb://localhost/firerating';
mongoose.connect( mongo_uri );
var db = mongoose.connection;
db.on( 'error', function () {
  var msg = 'unable to connect to database at ';
  throw new Error( msg + mongo_uri );
});

var app = express();

//app.configure( function(){
//  app.use(express.bodyParser());
//});

var bodyParser = require( 'body-parser' );
app.use( bodyParser.json({ limit: '1mb' }) );
app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

require( './model/project' );
require( './model/door' );
require( './routes' )( app );

app.get( '/', function( request, response ) {
  response.send( 'Cloud-based fire rating database\n' );
});

app.set( 'port', process.env.PORT || 3001 );

var server = app.listen(
  app.get( 'port' ),
  function() {
    console.log( 'Firerating server listening at port '
                + server.address().port ); }
);
