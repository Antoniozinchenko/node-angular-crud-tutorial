/**
 * Created by VladimirMalinovskiy on 04.11.2015.
 */
(function(){
    angular.module('client_app')
        .controller('MessagesController', ['$scope', 'CrudService', function($scope, CrudService){

            CrudService.getAllMessages().then(function(data){
                console.log('success getAllMessages');
                console.log(data);

                $scope.allMessages = data;
            });

            $scope.clearRemovedRow = function (id) {
                document.getElementById('row-message-' + id).remove();
            };

            $scope.removeMsg = function (userID) {
                CrudService.removeMessage(userID).then(function(){
                    $scope.clearRemovedRow(userID);
                    alert('Remove success !');
                });
            };

        }]);
})();