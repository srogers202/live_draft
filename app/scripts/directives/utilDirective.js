'use strict';

angular.module('firstAndFiveDraft').directive('round', ['CommonModel', function(CommonModel){
  return {
    restrict: 'EAC',
    scope: {
      pick: '='
    },
    link: function ($scope, elem) {

      var getRound = function() {
        var pick = $scope.pick;
        elem.html(CommonModel.getRoundFromPick(pick));
      };

      $scope.$watch('pick', function() {
        getRound();
      });
    }
  };
}]);
