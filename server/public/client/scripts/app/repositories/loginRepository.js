/**
 * Created by Deretor on 27.03.2015.
 */

(function(){
    var app = angular.module('app');

    app.factory('loginRepository',['$q','$location','$http',repoFunc]);
    var baseUrl = '/kto/req/';

    function repoFunc($q,$location,$http){
        var callServiceAsync = function (method, url, data) {
            var deferred = $q.defer();

            var requestConfig = {
                method: method,
                url: url
            };
            if (data) {
                requestConfig.data = data;
            }
            var success = function (data) {
                deferred.resolve(data);
            };
            var fail = function (status) {
                deferred.reject(status);
            };
            $http(requestConfig).success(success).error(fail);

            return deferred.promise;
        };

        var addUser = function(user){
            mockLoginArr.push(user);
        };

       var testLogin = function(user){
           var config = {
                method: 'post',
               url: baseUrl + 'checkUser'

           };
           return callServiceAsync(config.method,config.url,user);

       };

        return  {
            addUser : addUser,
            testUser : testLogin
        }

    }

})();