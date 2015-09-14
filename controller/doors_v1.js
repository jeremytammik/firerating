var mongoose = require('mongoose'),

Door = mongoose.model('Door');

exports.findAll = function(req, res){
  Door.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Door.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Door.create(req.body, function (err, door) {
    if (err) return console.log(err);
    return res.send(door);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  //console.log(req.body);
  console.log('Updating ' + id);
  Door.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %s instances', numberAffected.toString());
      return res.sendStatus(202);
  });
};

exports.update2 = function(req, res) {
  var id = req.params.id;
  //console.log(req.body);
  console.log('Updating ' + id);
  Door.findOne({'_id':id},function(err, result) {
    if(result) {
      Door.update({"_id":id}, req.body,
        function (err, numberAffected) {
          if (err) return console.log(err);
          console.log('Updated %s instances', numberAffected.toString());
          return res.sendStatus(202);
      });
    }
    else {
      Door.create(req.body, function (err, instance) {
        if (err) return console.log(err);
        return res.send(instance);
      });
    }
  });
};

exports.update3 = function(req, res) {
  var id = req.params.id;
  //console.log(req.body);
  console.log('Updating ' + id);
  Door.update({"_id":id}, req.body, {upsert:true},
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %s instances', numberAffected.toString());
      return res.sendStatus(202);
  });
};

exports.delete = function(req, res){
  var id = req.params.id;
  Door.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.findAllForProject = function(req, res){
  var pid = req.params.pid;
  Door.find({'project_id':pid},function(err, results) {
    return res.send(results);
  });
};

//exports.populate_ten_sample_doors = function(req, res){
//
//  // given: a Revit door element UniqeId;
//  // it must obviously be unique in the database.
//
//  var door_unique_id
//    = '60f91daf-3dd7-4283-a86d-24137b73f3da-0001fd0b';
//
//  Project.findOne({'title':'rac_basic_sample_project.rvt'}
//  , function(err, result) {
//    var pid = result._id;
//
//    console.log( 'project_id = ' + pid );
//
//    for( var i = 0; i < 10; ++i ) {
//      var s = i.toString();
//
//      Door.create({
//        '_id': door_unique_id + s,
//        'project_id': pid,
//        'level': 'Level ' + s,
//        'tag': 'Tag ' + s,
//        'firerating': 123.45 * (i + 0.1) }
//      , function (err) {
//        if (err) return console.log(err);
//        console.log( 'save instance returned err = ' + err );
//        return res.send(202);
//      });
//    }
//  });
//};
