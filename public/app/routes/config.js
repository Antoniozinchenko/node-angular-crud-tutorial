(function () {
    angular.module('client_app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'IndexController',
                templateUrl: '/mainTemplate'
            });
    }]);
})();