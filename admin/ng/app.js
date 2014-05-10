/*global angular:false, $:false, d3:false */
'use strict';
angular.module('votersAnalytics', ['ui.bootstrap'], function () {

})
  .controller('appController', function ($scope) {

  })
  .directive('topMenu', function () {
	  return {
      templateUrl: '/ng/templates/topmenu.html',
      replace: true,
      link: function (scope, elem, attrs) {
        return;
      }
    };
  });
