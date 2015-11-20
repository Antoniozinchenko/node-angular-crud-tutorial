(function(){
    angular.module('client_app')
        .controller('EditController',['$scope','CrudService', '$routeParams', function($scope, CrudService, $routeParams){

            $scope.singleData = [];



            CrudService.getOneMessage($routeParams.id).then(function(data){
                $scope.singleData = data[0];
                $scope.id = data[0].id;
                $scope.username = data[0].username;
                $scope.message = data[0].message;
            });


            $scope.editAction = function (data) {
                CrudService.updateMessage(data.id, data.username, data.message).then(function () {
                    alert("Message saved");
                });
            };



        }]);
})();