(function () {
    angular.module('client_app')
        .factory('CrudService', ['$q', '$http', function ($q, $http) {
            return {
                getAllMessages: function () {
                    var deferred = $q.defer();
                    $http.get('/getAllMessages')
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (err) {
                            deferred.reject(err);
                        });
                    return deferred.promise;
                },
                removeMessage: function (id) {
                    var deffer = $q.defer();
                    var objToSave = {id: id};
                    $http.post('/removeMessage', objToSave)
                        .success(function (data) {
                            deffer.resolve('ok');
                            console.log('in service: removed' + objToSave.id);
                            $('.all-messages #row-'+ objToSave.id).addClass('hide');

                        });
                    return deffer.promise;
                },
                saveMessage: function (username, message) {
                    var deffer = $q.defer();
                    var objToSave = {username: username, message: message};
                    $http.post('/saveMessage', objToSave)
                        .success(function (data) {
                            deffer.resolve('ok');
                            console.log('in service: added');
                        });
                    return deffer.promise;
                }
            }
        }]);
})();