module.exports = function(app) {
  var projects = require('./controller/projects_v1');
  app.get('/api/v1/projects', projects.findAll);
  app.get('/api/v1/projects/:id', projects.findById);
  app.post('/api/v1/projects', projects.add);
  app.put('/api/v1/projects/:id', projects.update);
  app.delete('/api/v1/projects/:id', projects.delete);
  app.get('/api/v1/projects/uid/:uid', projects.findByUniqueId);

  var doors = require('./controller/doors_v1');
  app.get('/api/v1/doors', doors.findAll);
  app.get('/api/v1/doors/:id', doors.findById);
  app.post('/api/v1/doors', doors.add);
  app.put('/api/v1/doors/:id', doors.update);
  app.delete('/api/v1/doors/:id', doors.delete);
}
