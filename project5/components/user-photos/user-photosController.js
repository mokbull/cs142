'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    $scope.photos = [];
    //$scope.comments = [];

    var userId = Number($routeParams.userId);
    var userObj = window.cs142models.userModel(userId);
    $scope.user = userObj;
    $scope.location = userObj.location;
    console.log('UserPhoto of ', $routeParams.userId);

    var userPhotos = window.cs142models.photoOfUserModel(userId);

    $scope.photos = userPhotos;
    $scope.toolbar.description = "Photos of " + userObj.first_name + " " + userObj.last_name;
    console.log('window.cs142models.photoOfUserModel($routeParams.userId)',
       window.cs142models.photoOfUserModel(userId));

  }]);
