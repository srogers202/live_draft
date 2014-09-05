'use strict';

angular.module('firstAndFiveDraft').controller('ReviewController', ['$scope', 'draftService',
  'draftConstants', function ($scope, draftService, draftConstants) {

  function buildTeamPicks() {
    var teamPicks = [];
    $scope.teams.forEach(function(team) {
      var picks = draftService.getTeamPicks(team.name);
      teamPicks.push(picks);
    });
    return teamPicks;
  }

  $scope.teams = draftConstants.teams;
  $scope.teamPicks = buildTeamPicks();

}]);
