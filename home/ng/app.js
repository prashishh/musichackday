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
  .when('/home', {
    templateUrl:'./ng/templates/home.html',
    controller: 'homeController'
  })
  .otherwise({
    redirectTo:'/'
  });
})

  .controller('appController', function ($scope, $firebase) {
   
  }) 
   .controller('homeController', function ($scope) {
      $scope.optionshow = 0;
      $scope.showSel = true;

      R.ready(function() {
        R.authenticate(function(nowAuthenticated) {
        });
      });

	   $scope.search = function() {
      R.request({
          method: 'search', 
          content: {
            query: $scope.queryText,
            types: 'Track'
          }, 
          success: function(response) {
            $scope.queryResult = response.result.results;
            $scope.showSel = false;
          },
          error: function(response) {
            showError(response.message);
          }
        });      
    }   

    $scope.playsong = function(key) {
      console.log($scope.skip);
      R.player.play({ initialPosition: $scope.skip, source: key });
    };

   })
  .controller('schoolController', function ($scope, $firebase) {
    $scope.newSchool = {"Class": "","Range": "","Route Code": "","Route Name": "","School Name ": "","Slno": "","Type": "","location": "","log": "","lon": ""};
    var schoolRef = new Firebase("codeforindia.firebaseio.com/");
    $scope.schools = $firebase(schoolRef);
    $scope.addSchool = function () {  
      	schoolRef.push($scope.newSchool); 
      	$scope.reset();
      	alert("School added");
    };
    $scope.reset = function () {
      $scope.newSchool = {"Class": "","Range": "","Route Code": "","Route Name": "","School Name ": "","Slno": "","Type": "","location": "","log": "","lon": ""};
    };
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
     // smallerChart('smallerGraph', 'indi.csv');
      //setupChart('smallerchart', { width: 500, height: 150, tension: 0.5, interpolation: 'monotone', showSummary: false});
    };
    
    
  });
