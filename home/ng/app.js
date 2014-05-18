

/*global angular:false, $:false, d3:false */
'use strict';
angular.module('votersAnalytics', ['ngRoute', 'ngResource', 'ui.bootstrap','firebase'], function () {

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

  .controller('appController', function ($scope, $firebase, $http) {
   
  }) 
   .controller('homeController', function ($scope, $http, $resource) {
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
          }
      });
    }   

    var url = "http://api.musixmatch.com/ws/1.1/track.search?q_artist=metallica&q_lyrics=nothing%else%matters&f_has_lyrics=1&format=jsonp&apikey=b956117746bf6dd8824562b615bf0516&callback=JSON_CALLBACK";

  $http.jsonp(url)
      .success(function(response){
          console.log(response);
      })
      .error(function(response){
        console.log('error');
        console.log(response);
      });
    

    $scope.playsong = function() {

      console.log($scope.finalResult);
      var title = encodeURIComponent($scope.finalResult.name); //'sexy%20and%20i%20know%20it';
      var artist = encodeURIComponent($scope.finalResult.artist);
      var query = 'http://api.musixmatch.com/ws/1.1/matcher.subtitle.get?q_track='+title;

      query += '&q_artist=';
      query += artist;  
      query += '&f_subtitle_length=200&f_subtitle_length_max_deviation=1&apikey=b956117746bf6dd8824562b615bf0516&format=JSONP&subtitle_format=mxm';

      console.log(query);
      $http.jsonp(query)
        .success(function(data){

            console.log(data);
        });
      console.log($scope.skip);
      R.player.play({ initialPosition: $scope.skip, source: $scope.finalResult.key });
    };

   })
  .controller('schoolController', function ($scope, $firebase) {
    
  })
  .directive('topMenu', function () {
	  
  })
  .controller('dashboardController', function ($scope, $firebase) {
  	
  });