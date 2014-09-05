'use strict';

/* global FastClick */

angular.module('firstAndFiveDraft', [
  'config',
  'ui.router',
  'ngTouch',
  'ngAnimate',
  'ngSanitize',
  'LocalStorageModule',
  'pasvaz.bindonce',
  'duScroll',
  'timer',
  'youtube-embed'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/welcome');

  var parentResolve = {
    allPlayers: ['PlayerService', function(PlayerService) {
      return PlayerService.getAll();
    }],

    allTeams: ['TeamService', function(TeamService) {
      return TeamService.getAll();
    }]
  };

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'views/welcome.html',
      controller: 'WelcomeController'
    })
    .state('draft', {
      url: '/draft',
      templateUrl: 'views/draft.html',
      controller: 'Draft',
      resolve: parentResolve
    })
    .state('review', {
      url: '/review',
      templateUrl: 'views/review.html',
      controller: 'ReviewController'
    })
    .state('reviewTeam', {
      url: '/review/:teamId/:cycle',
      templateUrl: 'views/review/team.html',
      controller: 'ReviewTeamController'
    })
  ;

  $httpProvider.interceptors.push(['ENV', function(ENV) {
    return {
      request: function (config) {
        if (config.url.indexOf('api') > -1) {
          if (config.url.indexOf('?') > -1) {
            config.url += '&apikey=' + ENV.apiKey;
          } else {
            config.url += '?apikey=' + ENV.apiKey;
          }
        }
        return config;
      }
    };
  }]);
})

.run(function($rootScope, $state, $stateParams, CommonModel) {
  FastClick.attach(document.body);

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.common = CommonModel;
});
