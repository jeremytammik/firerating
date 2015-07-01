// given: a Revit door element UniqeId;
// it must obviously be unique in the database.

var door_unique_id
  = '60f91daf-3dd7-4283-a86d-24137b73f3da-0001fd0b';

var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/firerating' );

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RvtUniqueId = String;

// How to identify the Revit project?
// Document.WorksharingCentralGUID property, if defined,
// or Document.ProjectInformation.UniqueId? Simpler:
// identify Revit project by machine name and full path,
// System.Environment.MachineName + Document.PathName;
// compress the long string? use MD5?
// SHA-2! https://en.wikipedia.org/wiki/SHA-2
// in .NET: System.Security.Cryptography.SHA256Managed
// path only works for saved non-workshared documents;
// no idea how to handle workshared ones...
// therefore, use automatic default mongo
// ObjectId instead of specifying our own, to handle both
// locally stored and central model projects.

var projectSchema = new Schema(
  { //_id               : RvtProjectPath
    computername        : String // .NET System.Environment.MachineName
    , path              : String // Document.PathName
    , centralserverpath : String // Document.GetWorksharingCentralModelPath().CentralServerPath
    , title             : String // Document.Title
    , numberofsaves     : Number // DocumentVersion.NumberOfSaves
    , versionguid       : RvtUniqueId // DocumentVersion.VersionGUID
    , projectinfo_uid   : RvtUniqueId } // ProjectInfo.UniqueId
  //{ _id: false } // suppress automatic generation
);

var ProjectModel = mongoose.model( 'Project', projectSchema );

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

    var instance = new DoorModel();
    instance._id = door_unique_id;
    instance.project_id = pid;
    instance.level = 'Level 1';
    instance.tag = 'Tag 1';
    instance.firerating = 123.45;
    instance.save(function (err) {
      console.log( 'save instance returned err = ' + err );
      if(!err) {
        var instance2 = new DoorModel();
        instance2._id = door_unique_id + '2';
        instance2.project_id = pid;
        instance2.level = 'Level 2';
        instance2.tag = 'Tag 2';
        instance2.firerating = 678.9;
        instance2.save(function (err) {
          console.log( 'save instance2 returned err = ' + err );
        });
      }
    });
  }
});
