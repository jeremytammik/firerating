// project.js
//
// mongo data model definition for a Revit project.
//
// Copyright 2015 by Jeremy Tammik, Autodesk Inc.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var RvtUniqueId = String;

// use automatic Mongo ObjectId for project.

var projectSchema = new Schema(
  { computername        : String // .NET System.Environment.MachineName
    , path              : String // Document.PathName
    , centralserverpath : String // Document.GetWorksharingCentralModelPath().CentralServerPath
    , title             : String // Document.Title
    , numberofsaves     : Number // DocumentVersion.NumberOfSaves
    , versionguid       : RvtUniqueId // DocumentVersion.VersionGUID
    , projectinfo_uid   : RvtUniqueId // ProjectInfo.UniqueId
  }
);

mongoose.model( 'Project', projectSchema );
