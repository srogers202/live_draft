'use strict';

angular.module('firstAndFiveDraft').controller('WelcomeController', ['$scope',
  '$state', function ($scope, $state) {
  $scope.beginDraft = function() {
    $state.go('draft');
  };
}]);
