'use strict';

angular.module('firstAndFiveDraft').factory('UtilService', ['$timeout',
  function($timeout) {

  function scrollToElement(containerId, itemId, offset, duration, easing) {
    $timeout(function() {
      angular.element(document.getElementById(containerId))
      .scrollTo(angular.element(document.getElementById(itemId)), offset, duration, easing);
    });
  }

  function scrollTo(containerId, top, duration, easing) {
    $timeout(function() {
      angular.element(document.getElementById(containerId)).scrollTo(0, top, duration, easing);
    });
  }

  return {
    scrollToElement: scrollToElement,
    scrollTo: scrollTo
  };
}]);
