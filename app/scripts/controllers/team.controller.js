(function() {
  'use strict';

  angular.module('firstAndFiveDraft').controller('Team', Team);

  Team.$inject = ['draftConstants'];

  function Team(draftConstants) {
    var vm = this;
    vm.roster = draftConstants.roster;
  }

})();
