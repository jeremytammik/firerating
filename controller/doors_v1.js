var mongoose = require('mongoose'),

Door = mongoose.model('Door');

DoorService = {

  findAll : function(req, res){
    Door.find({},function(err, results) {
      return res.send(results);
    });
  },

  findById : function(req, res){
    var id = req.params.id;
    Door.findOne({'_id':id},function(err, result) {
      return res.send(result);
    });
  },

  //add : function(req, res) {
  //  Door.create(req.body, function (err, door) {
  //    if (err) return console.log(err);
  //    return res.send(door);
  //  });
  //},

  insertBatch : function(req, res) {
    console.log('Insert batch');
    Door.insertMany(req.body, function (err, door) {
      if (err) return console.log(err);
      return res.send(door);
    });
  },

  //update : function(req, res) {
  //  var id = req.params.id;
  //  //console.log(req.body);
  //  console.log('Updating ' + id);
  //  Door.update({"_id":id}, req.body,
  //    function (err, numberAffected) {
  //      if (err) return console.log(err);
  //      console.log('Updated %s instances', numberAffected.toString());
  //      return res.sendStatus(202);
  //  });
  //},

  //update2 : function(req, res) {
  //  var id = req.params.id;
  //  //console.log(req.body);
  //  console.log('Updating ' + id);
  //  Door.findOne({'_id':id},function(err, result) {
  //    if(result) {
  //      Door.update({"_id":id}, req.body,
  //        function (err, numberAffected) {
  //          if (err) return console.log(err);
  //          console.log('Updated %s instances', numberAffected.toString());
  //          return res.sendStatus(202);
  //      });
  //    }
  //    else {
  //      Door.create(req.body, function (err, instance) {
  //        if (err) return console.log(err);
  //        return res.send(instance);
  //      });
  //    }
  //  });
  //},

  update3 : function(req, res) {
    var id = req.params.id;
    //console.log(req.body);
    console.log('Updating ' + id);
    Door.update({"_id":id}, req.body, {upsert:true},
      function (err, numberAffected) {
        if (err) return console.log(err);
        console.log('Updated %s instances', numberAffected.toString());
        return res.sendStatus(202);
    });
  },

  delete : function(req, res){
    var id = req.params.id;
    Door.remove({'_id':id},function(err,result) {
      return res.send(result);
    });
  },

  findAllForProject : function(req, res){
    var pid = req.params.pid;
    Door.find({'project_id':pid},function(err, results) {
      return res.send(results);
    });
  },

  findAllForProjectModifiedAfter : function(req, res){
    var pid = req.params.pid;
    var mod = req.params.mod;
    Door.find({'project_id':pid, 'modified':{$gt:mod}},
      function(err, results) {
        return res.send(results);
      }
    );
  },

  deleteAllForProject : function(req, res){
    var pid = req.params.pid;
    Door.remove({'project_id':pid},function(err, results) {
      return res.send(results);
    });
  }
};

module.exports = DoorService;
