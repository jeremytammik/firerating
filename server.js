// server.js
//
// main entry point for a cloud-based firerating
// database application, implemented as a node.js
// REST API driven mongoDB web server.
//
// Copyright 2015 by Jeremy Tammik, Autodesk Inc.

var pkg = require( './package.json' );
var express = require('express');
var mongoose = require( 'mongoose' );

var localMongo = true;

if(localMongo) {
  // local database
  var mongo_uri = 'mongodb://localhost/firerating';
} else {
  // mongolab hosted
  var mongo_uri = 'mongodb://revit:revit@ds047742.mongolab.com:47742/firerating';
}

mongoose.connect( mongo_uri );
var db = mongoose.connection;
db.on( 'error', function () {
  var msg = 'unable to connect to database at ';
  throw new Error( msg + mongo_uri );
});

var app = express();

var bodyParser = require( 'body-parser' );
app.use( bodyParser.json({ limit: '1mb' }) );
app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

require( './model/door' );
require( './routes' )( app );

app.get( '/', function( request, response ) {
  response.send( 'Hello from the cloud-based fire rating '
                + 'database ' + pkg.version + '.\n' );
});

app.set( 'port', process.env.PORT || 3001 );

var server = app.listen(
  app.get( 'port' ),
  function() {
    console.log( 'Firerating server '
                + pkg.version
                + ' listening at port '
                + server.address().port + ' with '
                + (localMongo?'locally ':'mongolab-')
                + 'hosted mongo db.'); }
);
