(function () {
    angular.module('client_app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/show-message', {
                controller: 'MessageController',
                templateUrl: '/allMessages'
            })
            .when('/show-message/:id', {
                controller: 'EditController',
                templateUrl: '/singleView'
            })
            .when('/edit-message/:id', {
                controller: 'EditController',
                templateUrl: '/editTemplate'
            })
            .when('/', {
                controller: 'IndexController',
                templateUrl: '/mainTemplate'
            });
    }]);
})();