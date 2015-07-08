// project.js
//
// mongo data model definition for a Revit project.
//
// Copyright 2015 by Jeremy Tammik, Autodesk Inc.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var Base64PcNamePath = String;

var RvtUniqueId = String;

// use automatic Mongo ObjectId for project.

var projectSchema = new Schema(
  { //_id                 : Base64PcNamePath // suppress automatic generation
    computername      : String // .NET System.Environment.MachineName
    , path              : String // Document.PathName
    , centralserverpath : String // Document.GetWorksharingCentralModelPath().CentralServerPath
    , title             : String // Document.Title
    , numberofsaves     : Number // DocumentVersion.NumberOfSaves
    , versionguid       : RvtUniqueId // DocumentVersion.VersionGUID
    , projectinfo_uid   : RvtUniqueId // ProjectInfo.UniqueId
    , jid               : String // jeremy custom document identifier
  }
  //{ _id: false } // suppress automatic generation
);

mongoose.model( 'Project', projectSchema );
