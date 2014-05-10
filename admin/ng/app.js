/*global angular:false, $:false, d3:false */
'use strict';
angular.module('votersAnalytics', ['ui.bootstrap', 'firebase'], function () {

})
  .controller('appController', function ($scope) {
    
    var peopleRef = new Firebase("codeforindia.firebaseio.com/0");
    
    // Automatically syncs everywhere in realtime
    $scope.people = $firebase(peopleRef);
    //console.log(people);
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
