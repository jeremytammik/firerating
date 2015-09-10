module.exports = function(app) {
  var doors = require('./controller/doors_v1');
  app.get('/api/v1/doors', doors.findAll);
  app.get('/api/v1/doors/:id', doors.findById);
  app.post('/api/v1/doors', doors.add);
  //app.put('/api/v1/doors/:id', doors.update); // this one does not allow me to PUT a new instance only update existing
  app.put('/api/v1/doors/:id', doors.update2); // works more like POST + PUT, cf. http://stackoverflow.com/questions/630453/put-vs-post-in-rest
  app.delete('/api/v1/doors/:id', doors.delete);
  app.get('/api/v1/doors/project/:pid', doors.findAllForProject);
}
