'use strict';


cs142App.controller('UserListController', ['$scope',
    function ($scope) {
        $scope.main.title = 'Users';
        $scope.users = [];
        $scope.users = window.cs142models.userListModel();
        console.log('window.cs142models.userListModel()', window.cs142models.userListModel());
    }]);

