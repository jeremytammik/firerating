module.exports = function(app) {
  var projects = require('./controller/projects');
  app.get('/projects', projects.findAll);
  app.get('/projects/:id', projects.findById);
  app.post('/projects', projects.add);
  app.put('/projects/:id', projects.update);
  app.delete('/projects/:id', projects.delete);

  var doors = require('./controller/doors');
  app.get('/doors', doors.findAll);
  app.get('/doors/:id', doors.findById);
  app.post('/doors', doors.add);
  app.put('/doors/:id', doors.update);
  app.delete('/doors/:id', doors.delete);
}
