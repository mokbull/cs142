'use strict';

cs142App.controller('UserDetailController', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = Number($routeParams.userId);
    var userObj = window.cs142models.userModel(userId);
    $scope.user = userObj;
    $scope.location = userObj.location;
    $scope.toolbar.description = userObj.first_name + " " + userObj.last_name;
    $scope.default.show = true;

    console.log('UserDetail of ', userId);

    console.log('window.cs142models.userModel($routeParams.userId)',
        window.cs142models.userModel(userId));

  }]);
