angular.module("school", [])
.factory("$database", function() {
  var ref = new Firebase("https://codeforindia.firebaseio.com/schools");
  return {
    getMessages: function() {
      var messages = [];
      ref.on("child_added", function(snapshot) {
        messages.push(snapshot.val());
      });
      return messages;
    },
    addMessage: function(message) {
      ref.push(message);
    }
  }
})
.controller("updateController", ["$scope", "$database",
                               function($scope, service) {
                                 $scope.school = {name: "St. Ann's High School, Secunderabad"}
                                 $scope.user = "Guest " + Math.round(Math.random()*101);
                                 $scope.messages = service.getMessages();
                                 $scope.addMessage = function() {
                                   service.addMessage({from: $scope.user, content: $scope.message});
                                   $scope.message = "";
                                 };
                               }
                              ]);
