// given: a Revit door element UniqeId;
// it must obviously be unique in the database.

var door_unique_id
  = '60f91daf-3dd7-4283-a86d-24137b73f3da-0001fd0b';

var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/firerating' );

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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

var ProjectModel = mongoose.model( 'Project', projectSchema );

// use Revit UniqueId for door instances.

var doorSchema = new Schema(
  { _id          : RvtUniqueId // suppress automatic generation
    , project_id : ObjectId
    , level      : String
    , tag        : String
    , firerating : Number },
  { _id: false } // suppress automatic generation
);

var DoorModel = mongoose.model( 'Door', doorSchema );

var projectInstance = new ProjectModel();

projectInstance.computername = 'JEREMYTAMMIB1D2';
projectInstance.path = 'C:/Program Files/Autodesk/Revit 2016/Samples/rac_basic_sample_project.rvt';
projectInstance.centralserverpath = '';
projectInstance.title = 'rac_basic_sample_project.rvt';
projectInstance.numberofsaves = 271;
projectInstance.versionguid = 'f498e8b1-7311-4409-a669-2fd290356bb4';
projectInstance.projectinfo_uid = '8764c510-57b7-44c3-bddf-266d86c26380-0000c160';

projectInstance.save(function (err) {
  console.log( 'save project returned err = ' + err );
  if(!err) {
    var pid = projectInstance._id;
    console.log( 'project_id = ' + pid );

    for( var i = 0; i < 10; ++i ) {
      var inst = new DoorModel();
      var s = i.toString();
      inst._id = door_unique_id + s;
      inst.project_id = pid;
      inst.level = 'Level ' + s;
      inst.tag = 'Tag ' + s;
      inst.firerating = 123.45 * (i + 0.1);
      inst.save(function (err) {
        console.log( 'save instance returned err = ' + err );
      });
    }
  }
});
