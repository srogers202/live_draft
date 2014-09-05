'use strict';

angular.module('firstAndFiveDraft').directive('positionRank', ['$rootScope', 'PlayerService',
function ($rootScope, PlayerService) {
  return {
    restrict: 'A',
    scope: {
      positionRank: '=',
      overall: '='
    },
    link: function ($scope, elem) {
      var setPositionRank = function() {
        var playerId = $scope.positionRank;
        var tempRank = 1;
        elem.html('?');
        var player = PlayerService.get(playerId);
        PlayerService.getAll().then(function(allPlayers) {
          for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i]._id === playerId) {
              elem.html(tempRank);
              break;
            } else if (allPlayers[i].position === player.position && allPlayers[i].espnRank < player.espnRank) {
              tempRank++;
            }
          }
        });
      };

      $scope.$watch('overall', function() {
        setPositionRank();
      });

      $scope.$watch('positionRank', function() {
        setPositionRank();
      });
    }
  };
}]);
