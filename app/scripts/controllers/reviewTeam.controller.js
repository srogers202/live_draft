'use strict';

angular.module('firstAndFiveDraft').controller('ReviewTeamController', ['$scope', 'draftService',
  'draftConstants', '$stateParams', '$state', '$timeout',
  function ($scope, draftService, draftConstants, $stateParams, $state, $timeout) {
    var vm = $scope;

    var teamId = $stateParams.teamId;
    var teams = draftConstants.teams;
    vm.team = teams[teamId];
    vm.cycle = $stateParams.cycle === '1';
    vm.review = true;

    if (teamId === undefined || vm.team === undefined) {
      $state.go('review');
    }

    vm.teamPicks = draftService.getTeamPicks(vm.team.name);
    if (vm.cycle) {
      $timeout(function() {
        var nextTeam = parseInt(teamId) + 1;
        if (nextTeam < teams.length) {
          $state.go('reviewTeam', {teamId: nextTeam});
        } else {
          $state.go('review');
        }
      }, draftConstants.reviewPause);
    }

}]);
