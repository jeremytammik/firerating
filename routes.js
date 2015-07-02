module.exports = function(app) {
  var projects = require('./controller/projects');
  app.get('/projects', projects.findAll);
  app.get('/projects/:id', projects.findById);
  app.post('/projects', projects.add);
  app.put('/projects/:id', projects.update);
  app.delete('/projects/:id', projects.delete);
}