
cs142App.controller('P4MainController', ['$scope', function($scope) {
    $scope.showExample = false;
    $scope.flip = function () {
      $scope.showExample = !($scope.showExample);
    };
    console.log($scope.showExample);
}]);