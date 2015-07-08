module.exports = function(app) {

  //var projects = require('./controller/projects_v1');
  //app.get('/api/v1/projects', projects.findAll);
  //app.get('/api/v1/projects/:id', projects.findById);
  //app.post('/api/v1/projects', projects.add);
  //app.put('/api/v1/projects/:id', projects.update);
  //app.delete('/api/v1/projects/:id', projects.delete);

  // Using the ProjectInformation UniqueId is
  // utterly unreliable, we can stop that right
  // away. Use computer name and full project
  // path instead for the time being.
  // Furthermore, this query can be achieved using
  // a query string, e.g. "projects?projectinfo_uid=..."
  //app.get('/api/v1/projects/uid/:uid', projects.findByUniqueId);
  //app.get('/api/v1/projects/pcnamepath/:s', projects.findByComputerNamePath);
  //app.get('/api/v1/projects/jid/:jid', projects.findByJid);

  var doors = require('./controller/doors_v1');
  app.get('/api/v1/doors', doors.findAll);
  app.get('/api/v1/doors/:id', doors.findById);
  app.post('/api/v1/doors', doors.add);
  app.put('/api/v1/doors/:id', doors.update);
  app.delete('/api/v1/doors/:id', doors.delete);

  app.get('/api/v1/doors/project/:pid', doors.findAllForProject);
}
