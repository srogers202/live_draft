'use strict';

angular.module('firstAndFiveDraft').controller('EasterEggController', ['$scope',
  'draftConstants',
  function ($scope, draftConstants) {
    $scope.showVideo = false;

    $scope.$on('youtube.player.ended', function () {
      $scope.showVideo = false;
    });

    $scope.$on('youtube.player.playing', function () {
      $scope.showVideo = true;
    });

    $scope.$on('playerDrafted', function(event, playerId) {
      playVideo(playerId);
    });

    var playVideo = function(playerId) {
      if (draftConstants.showVideos) {
        draftConstants.videos.forEach(function (video) {
          if (video.playerId === playerId) {
            $scope.videoCode = video.code;
            $scope.videoControl = {
              'playerVars': {
                controls: 0,
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                /*jshint camelcase: false */
                iv_load_policy : 3,
                start: video.start,
                end: video.end
              }};
          }
          return;
        });
      }
    };
  }]);
