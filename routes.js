module.exports = function(app) {
  var doors = require('./controller/doors_v1');
  app.get('/api/v1/doors', doors.findAll);
  app.get('/api/v1/doors/:id', doors.findById);
  app.post('/api/v1/doors', doors.add);
  app.put('/api/v1/doors/:id', doors.update);
  app.delete('/api/v1/doors/:id', doors.delete);
  app.get('/api/v1/doors/project/:pid', doors.findAllForProject);
}
