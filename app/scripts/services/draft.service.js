(function() {
  'use strict';

  angular.module('firstAndFiveDraft').factory('draftService', draftService);

  draftService.$inject = ['draftConstants', '$q', 'PlayerService', 'CommonModel'];

  function draftService(draftConstants, $q, PlayerService, CommonModel) {
    var draftPicks = [];
    var availablePlayers = [];
    var currentPick = {};
    var service = {
      init: init,
      isAvailable: isAvailable,
      draftPicks: draftPicks,
      availablePlayers: availablePlayers,
      currentPick: currentPick,
      draftPlayer: draftPlayer,
      nextPick: nextPick,
      getTeamPicks: getTeamPicks,
      isKeeperPick: isKeeperPick
    };

    return service;

    function getKeeper(team, round) {
      var playerId = -1;
      team.keepers.forEach(function(keeper) {
        if (keeper.round === round) {
          playerId = keeper.playerId;
        }
      });
      return playerId;
    }

    function isKeeper(playerId) {
      var keeper = false;
      draftPicks.forEach(function(draftPick) {
        if (draftPick.player !== undefined && draftPick.player._id === playerId && draftPick.keeper) {
          keeper = true;
        }
      });
      return keeper;
    }

    function isAvailable(playerId) {
      var available = false;
      for (var i = 0; i < availablePlayers.length; i++) {
        if (availablePlayers[i]._id === playerId) {
          available = true;
          break;
        }
      }
      return available;
    }

    function isKeeperPick(pick) {
      var keeper = false;
      draftPicks.forEach(function(draftPick) {
        if (draftPick.pick === pick && draftPick.keeper) {
          keeper = true;
        }
      });
      return keeper;
    }

    function initDraftPick(team, pick) {
      var draftPick = {
        pick: pick,
        team: team.name
      };

      // Handle keepers
      var keeperPlayerId = getKeeper(team, CommonModel.getRoundFromPick(pick));
      if (keeperPlayerId !== -1) {
        draftPick.player = PlayerService.get(keeperPlayerId);
        draftPick.keeper = true;
      }

      // Handle trades
      draftConstants.teams.forEach(function(draftTeam) {
        if (draftTeam.trade !== undefined) {
          draftTeam.trade.forEach(function(tradePick) {
            if (tradePick === pick) {
              draftPick.team = draftTeam.name;
            }
          });
        }
      });

      draftPicks.push(draftPick);
    }

    function init() {
      var deferred = $q.defer();

      var pick = 1;
      for (var round = 1; round <= draftConstants.rounds; round++) {
        for (var i = 0; i < draftConstants.teams.length; i++) {
          initDraftPick(draftConstants.teams[i], pick);
          pick++;
        }
        round++;
        for (var j = draftConstants.teams.length-1; j >= 0; j--) {
          initDraftPick(draftConstants.teams[j], pick);
          pick++;
        }
      }

      PlayerService.getAll().then(function(allPlayers) {
        allPlayers.forEach(function(player) {
          if (!isKeeper(player._id)) {
            availablePlayers.push({
              _id: player._id,
              rank: player.espnRank
            });
          }
       });
       availablePlayers.sort(function(a, b) {
         if (a.rank < b.rank || b.rank === undefined) {
           return -1;
         }
         if (a.rank > b.rank || a.rank === undefined) {
           return 1;
         }
         return 0;
       });

       for (var i = 0; i < draftPicks.length; i++) {
         if (!draftPicks[i].keeper) {
           currentPick = draftPicks[i];
           break;
         }
       }

       deferred.resolve(currentPick);
     });

      return deferred.promise;
    }

    function draftPlayer(playerId) {
      var deferred = $q.defer();

      if (!isKeeperPick(currentPick.pick)) {
        draftPicks[currentPick.pick - 1].player = PlayerService.get(playerId);

        for(var i = 0; i < availablePlayers.length; i++) {
          var player = availablePlayers[i];
          if(player._id === playerId) {
            availablePlayers.splice(i, 1);
          }
        }
      }

      deferred.resolve(currentPick);

      return deferred.promise;
    }

    function nextPick() {
      var deferred = $q.defer();

      currentPick = draftPicks[currentPick.pick];

      deferred.resolve(currentPick);

      return deferred.promise;
    }

    function getTeamPicks(team) {
      var teamPicks = {starters:[], bench:[]};

      draftConstants.roster.forEach(function(position) {
        if (position === 'Bench') {
          teamPicks.bench.push({ position: position });
        } else {
          teamPicks.starters.push({ position: position });
        }
      });

      var tempTeam = [];
      draftPicks.forEach(function(draftPick) {
        if (draftPick.player !== undefined  && draftPick.team === team) {
          tempTeam.push(draftPick);
        }
      });

      tempTeam.sort(function (a, b) {
        if (a.player.espnRank > b.player.espnRank) {
          return 1;
        }
        if (a.player.espnRank < b.player.espnRank) {
          return -1;
        }
        return 0;
      });

      tempTeam.forEach(function(draftPick) {
        var addToBench = true;
        for (var i = 0; i < teamPicks.starters.length; i++) {
          var starterPick = teamPicks.starters[i];
          if (starterPick.position.indexOf(draftPick.player.position) > -1 && starterPick.pick === undefined) {
            starterPick.player = draftPick.player;
            starterPick.pick = draftPick.pick;
            addToBench = false;
            break;
          }
        }

        if (addToBench) {
          for (i = 0; i < teamPicks.bench.length; i++) {
            var benchPick = teamPicks.bench[i];
            if (benchPick.pick === undefined) {
              benchPick.player = draftPick.player;
              benchPick.pick = draftPick.pick;
              break;
            }
          }
        }
      });

      return teamPicks;
    }
  }

})();
