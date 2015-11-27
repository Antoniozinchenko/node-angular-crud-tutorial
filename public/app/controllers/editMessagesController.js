/**
 * Created by VladimirMalinovskiy on 04.11.2015.
 */
(function(){
    angular.module('client_app')
        .controller('EditMessagesController',
            ['$scope', 'CrudService', '$routeParams', '$location',
            function($scope, CrudService, $RouteParams, $location){

                var id = $RouteParams.id;

                CrudService.getMessage(id).then(function(data){
                    console.log('success getMessage');
                    console.log(data);
                    console.log(data.length);

                    if(!data.length) {
                        $location.path('/404');
                    }

                    $scope.userName = data[0].username;
                    $scope.message = data[0].message;
                    $scope.userId = data[0].id;
                });

                $scope.updateMsg = function (id, name, message) {
                    console.log('updateMsg: '+id + ', '+ name + ', ' +message);
                    CrudService.updateMessage(id, name, message).then(function(){
                        //$scope.clearForm();
                        alert('End updateMsg');
                    });
            };

        }]);
})();