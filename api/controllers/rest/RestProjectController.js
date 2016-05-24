/**
 * RestProjectController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  restGetProjects: function(req, res) {
    Project.find({
      limit: 20
    }).exec(function(err, projects) {
      return res.json(200, projects);
    });
  },
  saveProject: function(req, res) {
    Project.create({
      name: req.body.display_name,
      client_id: req.body.client.id,
      status: 1
    }).exec(function(err, project) {
      if (!err) {
        sails.sockets.blast('project-added', {
          project: project
        });
        return res.json(200, project);
      } else {
        console.log(err);
      }
    })
  },
  saveProjectEstimate: function(req, res) {
    Estimate.create({
      project_id: req.body.project_id,
      desc: req.body.desc,
      hours_allocated: req.body.hours_allocated
    }).exec(function(err, estimate){
      if(!err) {
        return res.json(200, []);
      } else {
        console.log(err);
      }
    })
  },
  resetGetProjectById: function(req, res) {
    const pId = req.body.id;
    Project.find({
      id: pId
    }).populate('estimates').exec(function(err, project) {
      if (!err) {
        return res.json(200, project);
      }
    });
  }
};
