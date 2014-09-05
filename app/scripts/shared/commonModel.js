'use strict';

angular.module('firstAndFiveDraft').factory('CommonModel', ['PlayerService', 'TeamService',
  'draftConstants',
  function (PlayerService, TeamService, draftConstants) {

  function getPlayer(playerId) {
    return PlayerService.get(playerId);
  }

  function getTeam(teamId) {
    return TeamService.get(teamId);
  }
  
  function getRoundFromPick(pick) {
    return Math.ceil(pick/draftConstants.teams.length);
  }

  return {
    getPlayer: getPlayer,
    getTeam: getTeam,
    getRoundFromPick: getRoundFromPick
  };
}]);
