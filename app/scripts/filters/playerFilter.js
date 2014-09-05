'use strict';

angular.module('firstAndFiveDraft').filter('playerSearch', [function() {
  return function(playerRanking, player, query) {
    if (query === undefined || query === '' ||
        player.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        player.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        (player.firstName + ' ' +  player.lastName).toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      return true;
    }
    return false;
  };
}]);

angular.module('firstAndFiveDraft').filter('positionFilter', [function() {
  return function(picks, pos) {
    var filtered = [];

    picks.forEach(function(pick) {
      if (pick.player !== undefined && pick.player.position.toLowerCase() === pos.toLowerCase()) {
        filtered.push(pick);
      }
    });

    return filtered;
  };
}]);

angular.module('firstAndFiveDraft').filter('experience', [function() {
  return function(experience) {
    if (experience === 0) {
      return 'Rookie';
    } else {
      return experience;
    }
  };
}]);

angular.module('firstAndFiveDraft').filter('age', [function() {
  return function(dob) {
    var age = '?';
    if (dob !== undefined) {
      var ageDifMs = Date.now() - new Date(dob).getTime();
      var ageDate = new Date(ageDifMs);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return age;
  };
}]);
