'use strict';

angular.module('firstAndFiveDraft').factory('TeamService', ['$http', '$q', 'ENV',
  function($http, $q, ENV) {

  var teams = [];

  function getAll() {
    var deferred = $q.defer();

    if (teams.length === 0) {
      $http.get(ENV.apiUrl + '/teams')
      .success(function(data) {
        teams = data;
        deferred.resolve(teams);
      })
      .error(function (data) {
        deferred.reject(data);
      });
    } else {
      deferred.resolve(teams);
    }

    return deferred.promise;
  }

  function get(teamId) {
    var index;

    for (var key=0;key<teams.length;key++) {
      var value = teams[key];
      if (value._id === teamId) {
        index = key;
        break;
      }
    }
    return teams[index];
  }

  return {
    getAll: getAll,
    get: get
  };
}]);
