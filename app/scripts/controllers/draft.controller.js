(function() {
  'use strict';

  angular.module('firstAndFiveDraft').controller('Draft', Draft);

  Draft.$inject = ['draftService', '$timeout', 'PlayerService', '$scope',
                   'PlayerDataService', 'TeamService', '$rootScope',
                   'UtilService', 'draftConstants', '$state'];

  function Draft(draftService, $timeout, PlayerService, $scope, PlayerDataService,
                 TeamService, $rootScope, UtilService, draftConstants, $state) {
    var vm = $scope;
    vm.positionFilters = ['all','qb','rb','wr','te','dst','k'];
    vm.positionFilter = 'all';
    vm.config = {};
    vm.showPlayer = showPlayer;
    vm.togglePosition = togglePosition;
    vm.scrollToSearchedPlayer = scrollToSearchedPlayer;
    vm.draftPlayer = draftPlayer;
    vm.$watch('activePlayerId', watchActivePlayerId);
    var lastPick = draftConstants.rounds * draftConstants.teams.length;

    init();

    function init() {
      draftService.init().then(function(currentPick) {
        $rootScope.$broadcast('timer-start');
        vm.availablePlayers = draftService.availablePlayers;
        vm.activePlayerId = vm.availablePlayers[0]._id;
        vm.draftPicks = draftService.draftPicks;
        vm.currentPick = currentPick;
        vm.teamPicks = draftService.getTeamPicks(currentPick.team);
      });
    }

    function showPlayer(playerId) {
      if (!vm.draftPause) {
        vm.activePlayerId = playerId;

        if (vm.config.searchPlayer) {
          vm.scrollToSearchedPlayer(playerId);
        }
      }
    }

    function togglePosition(position) {
      vm.positionFilter = position;
      UtilService.scrollToElement('available-list', 'available-top', 0, 500);
    }

    function scrollToSearchedPlayer(playerId) {
      var query = vm.config.playerQuery;
      if (query !== undefined && query !== '') {
        UtilService.scrollToElement('available-list', 'player-'+playerId, 0, 500);
      }
      vm.config.searchPlayer = false;
      vm.config.playerQuery = '';
    }

    function draftPlayer(playerId) {
      vm.drafted = true;
      vm.draftPause = true;
      vm.$broadcast('playerDrafted', playerId);
      draftService.draftPlayer(playerId).then(function(currentPick) {
        vm.teamPicks = draftService.getTeamPicks(currentPick.team);
        $rootScope.$broadcast('timer-stop');

        if (playerId === 340 && currentPick.team !== 'Dave') {
          vm.firstandfiveEgg = true;
        }

        $timeout(function() {
          draftService.nextPick().then(function(nextPick) {
            vm.draftPause = false;
            $timeout(function() {
              vm.firstandfiveEgg = false;
            }, 7000);

            if (nextPick === undefined || nextPick > lastPick) {
              $state.go('reviewTeam', {teamId: 0, cycle: 1});
            }

            vm.drafted = !vm.keeper;

            $rootScope.$broadcast('timer-set-countdown-seconds', draftConstants.pickDuration);
            $rootScope.$broadcast('timer-start');

            var top = document.getElementById('pick-' + nextPick.pick).offsetTop -
                      document.getElementById('pick-list').offsetHeight/2;
            UtilService.scrollTo('pick-list', top, 500);

            $timeout(function() {
              UtilService.scrollToElement('available-list', 'available-top', 0, 500);
            }, 500);

            vm.positionFilter = 'all';
            vm.currentPick = nextPick;
            vm.teamPicks = draftService.getTeamPicks(nextPick.team);

            if (draftService.isKeeperPick(nextPick.pick)) {
              vm.activePlayerId = nextPick.player._id;
              vm.draftPlayer(nextPick.player._id);
            }

          });
        }, draftConstants.selectionPause);
      });
    }

    function watchActivePlayerId() {
      vm.player = PlayerService.get(vm.activePlayerId);
      if (draftService.isKeeperPick(vm.currentPick.pick)) {
        vm.keeper = true;
        vm.drafted = false;
      } else {
        vm.keeper = false;
        vm.drafted = !draftService.isAvailable(vm.activePlayerId);
      }
      PlayerDataService.get(vm.activePlayerId).then(function(playerData) {
        vm.playerData = playerData;
      });
      vm.team = TeamService.get(vm.player.team);
    }
  }

})();
