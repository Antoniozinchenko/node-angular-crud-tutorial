(function () {
    angular.module('client_app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'IndexController',
                templateUrl: '/mainTemplate'
            })
            .when('/show-message', {
                controller: 'MessagesController',
                templateUrl: '/showMessagePage'
            })
            .when('/edit/:id', {
                controller: 'EditMessagesController',
                templateUrl: '/editMessagePage'
            })
            .when('/single/:id', {
                controller: 'EditMessagesController',
                templateUrl: '/singlePage'
            })
            .when('/404', {
                templateUrl: '/pageNotFound'
            })
            .otherwise({
                templateUrl: '/pageNotFound'
            });
    }]);
})();