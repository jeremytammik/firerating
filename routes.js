module.exports = function(app) {
  var DoorService = require('./controller/doors_v1');
  app.get('/api/v1/doors', DoorService.findAll);
  app.get('/api/v1/doors/:id', DoorService.findById);
  //app.post('/api/v1/doors', DoorService.add); // is this used any longer at all, now that update3 is available?
  app.post('/api/v1/doors', DoorService.insertBatch); // add multiple records
  //app.put('/api/v1/doors/:id', DoorService.update); // this one does not allow me to PUT a new instance only update existing
  //app.put('/api/v1/doors/:id', DoorService.update2); // works more like POST + PUT, cf. http://stackoverflow.com/questions/630453/put-vs-post-in-rest
  app.put('/api/v1/doors/:id', DoorService.update3); // added {upsert:true} option
  app.delete('/api/v1/doors/:id', DoorService.delete);
  app.get('/api/v1/doors/project/:pid', DoorService.findAllForProject);
  app.get('/api/v1/doors/project/:pid/newer/:mod', DoorService.findAllForProjectModifiedAfter);
  app.delete('/api/v1/doors/project/:pid', DoorService.deleteAllForProject);
}
