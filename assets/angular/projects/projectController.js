app.controller('ProjectController', ['$scope', 'data', 'ProjectFactory', '$location', '$log', '$routeParams',
  function($scope, data, ProjectFactory, $location, $log, $routeParams) {
    /**
     * Getting the list of projects through resolve.
     */
    if (data && data.projectList != undefined) {
      data.projectList.success(function(data) {
        $log.debug('project list', data);
        $scope.projects = data;
      });
    }

    if (data && data.clientList != undefined) {
      data.clientList.success(function(data) {
        $log.debug('client list', data);
        $scope.clients = data;
      });
    }

    if (data && data.project != undefined) {
      data.project.success(function(data) {
        $scope.singleProject = data[0];
      });
    }

    io.socket.on('project-added', function gotHelloMessage(data) {
      $scope.$broadcast('projectAdded', data);
    });

    $scope.$on('projectAdded', function(event, data) {
      $scope.projects.push(data.project);
      $scope.$apply(); /*Need to check why apply is required*/
    });

    angular.extend($scope, {
      newProject: {},
      singleProject: {},
      projects: [],
      clients: [],
      projectEstimate: {}
    });

    angular.extend($scope, {
      saveProject: function() {
        ProjectFactory.saveProject($scope.newProject).success(function(response) {
          $scope.newProject = {};
          $location.path('/');
        }).error(function(message, code, data) {
          alert(message);
        });
      },
      saveProjectEstimate: function() {

        $scope.projectEstimate = {
          project_id:$routeParams.id,
          desc: $scope.projectEstimate.desc,
          hours_allocated: $scope.projectEstimate.hours_allocated
        };

        ProjectFactory.saveProjectEstimate($scope.projectEstimate).success(function(response) {
          $scope.projectEstimate = {};
          $location.path('/project/'+$routeParams.id+'/estimate');
        }).error(function(message, code, data) {
          alert(message);
        });
      }
    });
  }
]);
