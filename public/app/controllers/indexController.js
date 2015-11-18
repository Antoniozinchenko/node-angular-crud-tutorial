/**
 * Created by VladimirMalinovskiy on 04.11.2015.
 */
(function(){
    angular.module('client_app')
        .controller('IndexController',['$scope','CrudService', function($scope, CrudService){

            $scope.sendMsg = function (name , body) {
                CrudService.saveMessage(name , body);
                $scope.clearForm();
            };

            $scope.clearForm = function () {
                $scope.username = "";
                $scope.message = "";
            }

        }]);
})();