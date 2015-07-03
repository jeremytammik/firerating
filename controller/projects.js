var mongoose = require('mongoose'),

Project = mongoose.model('Project');

exports.findAll = function(req, res){
  Project.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Project.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Project.create(req.body, function (err, project) {
    if (err) return console.log(err);
    return res.send(project);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Project.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d projects', numberAffected);
      return res.send(202);
  });
};

exports.delete = function(req, res){
  var id = req.params.id;
  Project.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.populate_rac_basic_sample_project = function(req, res){
  Project.create({
    'computername': 'JEREMYTAMMIB1D2',
    'path': 'C:/Program Files/Autodesk/Revit 2016/Samples/rac_basic_sample_project.rvt',
    'centralserverpath': '',
    'title': 'rac_basic_sample_project.rvt',
    'numberofsaves': 271,
    'versionguid': 'f498e8b1-7311-4409-a669-2fd290356bb4',
    'projectinfo_uid': '8764c510-57b7-44c3-bddf-266d86c26380-0000c160' }
  , function (err) {
    if (err) return console.log(err);
    console.log( 'save project returned err = ' + err );
    return res.send(202);
  });
};
