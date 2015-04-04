/**
 * Created by Deretor on 27.03.2015.
 */

(function(){
    var app = angular.module('app');

    app.factory('loginRepository',['$q','$location','$http',repoFunc]);
    var baseUrl = '/kto/req/';
    function repoFunc($q,$location,$http){
        //mockLoginArr=[
        //    {
        //        login: 'adminStud',
        //        password : '12345'
        //    }
        //
        //];
        var addUser = function(user){
            mockLoginArr.push(user);
        };

       var testLogin = function(user){
           var config = {
                method: 'post',
               url: baseUrl + 'checkUser'

           };

           $http.post( baseUrl + 'checkUser', user).
               success(function(data, status, headers, config) {
                   // this callback will be called asynchronously
                   // when the response is available
               }).
               error(function(data, status, headers, config) {
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
               });

       };

        return  {
            addUser : addUser,
            testUser : testLogin
        }

    }

})();