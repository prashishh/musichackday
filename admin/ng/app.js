/*global angular:false, $:false, d3:false */
'use strict';
angular.module('votersAnalytics', ['ngRoute','ui.bootstrap','firebase'], function () {

})

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl:'./ng/templates/dashboard.html',
   	controller: 'dashboardController'
  })
  .when('/edit/:projectId', {
    controller:'EditCtrl',
    templateUrl:'detail.html'
  })
  .when('/schools', {
    controller:'schoolController',
    templateUrl:'./ng/templates/schools.html'
  })
  .when('/bigchart', {
    templateUrl:'./ng/templates/bigchart.html',
    controller: 'bigChartController'
  })
  .otherwise({
    redirectTo:'/'
  });
})

  .controller('appController', function ($scope, $firebase) {
   
  }) 
   .controller('bigChartController', function ($scope) {
		$scope.init = function () {
          setupChart('mainGraph');
        };
   })
  .controller('schoolController', function ($scope, $firebase) {
    var schoolRef = new Firebase("codeforindia.firebaseio.com/");
    $scope.schools = $firebase(schoolRef);
  })
  .directive('topMenu', function () {
	  return {
      templateUrl: '/ng/templates/topmenu.html',
      replace: true,
      link: function (scope, elem, attrs) {
        return;
      }
    };
  })
  .controller('dashboardController', function ($scope, $firebase) {
  	$scope.init = function () {
      // creates the google map
      initialize();
      smallerChart('smallerGraph', 'indi.csv');
      //setupChart('smallerchart', { width: 500, height: 150, tension: 0.5, interpolation: 'monotone', showSummary: false});
    };
    
    
  });
