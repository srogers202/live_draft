'use strict';

angular.module('firstAndFiveDraft').controller('HeaderController', ['$scope',
  'draftConstants', '$state', '$rootScope',
  function ($scope, draftConstants, $state, $rootScope) {

  $scope.pickDuration = draftConstants.pickDuration;

  $rootScope.$on('$stateChangeSuccess', function() {
    $scope.showTimer = $state.includes('draft');
  });

}]);
