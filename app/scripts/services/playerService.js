'use strict';

angular.module('firstAndFiveDraft').factory('PlayerService', ['$http', '$q', 'ENV',
  function($http, $q, ENV) {

  var players = [];

  function getAll() {
    var deferred = $q.defer();

    if (players.length === 0) {
      $http.get(ENV.apiUrl + '/players')
      .success(function (data) {
        players.length = 0;
        players.push.apply(players, data);
        deferred.resolve(data);
      })
      .error(function (data) {
        deferred.reject(data);
      });
    } else {
      deferred.resolve(players);
    }

    return deferred.promise;
  }

  function get(playerId) {
    var index;
    for (var key = 0; key < players.length; key++) {
      var value = players[key];
      if (value._id === playerId) {
        index = key;
        break;
      }
    }
    return players[index];
  }

  return {
    getAll: getAll,
    get: get
  };
}]);

angular.module('firstAndFiveDraft').factory('PlayerDataService', ['$http', '$q', 'ENV',
  function($http, $q, ENV) {

  function get(playerId) {
    var deferred = $q.defer();

    $http.get(ENV.apiUrl + '/playerdata/' + playerId)
    .success(function (data) {
      deferred.resolve(data);
    })
    .error(function (data) {
      deferred.reject(data);
    });

    return deferred.promise;
  }

  return {
    get: get
  };
}]);
