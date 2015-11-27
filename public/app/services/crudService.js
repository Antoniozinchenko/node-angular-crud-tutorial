(function () {
    angular.module('client_app')
        .factory('CrudService', ['$q', '$http', function ($q, $http) {
            return {

                saveMessage: function (username, message) {
                    var deffer = $q.defer();
                    var objToSave = {username: username, message: message};
                    $http.post('/saveMessage', objToSave)
                        .success(function (data) {
                            deffer.resolve('ok');
                            console.log('in service: added');
                        });
                    return deffer.promise;
                },
                getAllMessages: function () {
                    var deffer = $q.defer();
                    $http.get('/getAllMessages')
                        .success(function (data) {
                            deffer.resolve(data);
                            console.log('got messages');
                        });
                    return deffer.promise;
                },
                removeMessage: function (userID) {
                    var objID = {id: userID};
                    var deffer = $q.defer();
                    $http.post('/removeMessage', objID)
                        .success(function () {
                            deffer.resolve('ok');
                            console.log('in service: remove');
                        });
                    return deffer.promise;
                },
                getMessage: function (userID) {
                    var deffer = $q.defer();
                    $http.get('/getMessage/'+userID)
                        .success(function (data) {
                            deffer.resolve(data);
                            console.log('got messages');
                        });
                    return deffer.promise;
                },
                updateMessage: function (id, username, message) {
                    var objData = {
                        id: id,
                        username: username,
                        message: message
                    };

                    var deffer = $q.defer();
                    $http.post('/updateMessage', objData)
                        .success(function () {
                            deffer.resolve('ok');
                            console.log('in service: update');
                        });
                    return deffer.promise;
                }
            }
        }]);
})();