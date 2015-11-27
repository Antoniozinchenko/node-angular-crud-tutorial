(function(){
    angular.module('client_app')
        .controller('MessageController',['$scope','CrudService', function($scope, CrudService){

            $scope.allMessage = [];


            CrudService.getAllMessages().then(function(data){
                $scope.allMessage = data;
            });

            $scope.removeAction = function (id) {
                CrudService.removeMessage(id); // service function
            };


        }]);
})();