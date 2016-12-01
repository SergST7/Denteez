'use strict';

//= ../../bower_components/angular/angular.min.js
;
//= ../../bower_components/angular-route/angular-route.min.js
;

//= ../../bower_components/angular-strap/dist/angular-strap.min.js
;

//= ../../bower_components/angular-strap/dist/angular-strap.tpl.min.js
;

// main application
var app = angular.module('myApp', ['ngRoute', 'mgcrea.ngStrap.modal' ]);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/services', {
            templateUrl : 'services.html',
            controller : 'servicesCtrl',
            controllerAs: 'services'
        })
        .otherwise({
            redirectTo : '/services'
        });
}]);

app.service('networkService',  function ($http) {
    this.getData = function () {
        return $http({
            method: 'GET',
            url: 'http://504080.com/api/v1/services/categories',
            headers : {Authorization:'87782fb89593ba903d95729b1cdfb69936458d93'}
        });
    };
});

app.controller('servicesCtrl', function ($scope, $modal, networkService) {

    $scope.modal = {};

    networkService.getData()

        .success(function (res) {
            $scope.categories = res.data;
            console.log($scope.categories);
        })
        .error(function (e) {
            console.log(e);
            $scope.modal.content = e.error.description;
            $scope.modal.title = e.error.message;
            $modal({title: $scope.modal.title , content: $scope.modal.content, show: true});
        })
});
