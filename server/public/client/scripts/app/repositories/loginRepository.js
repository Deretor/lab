/**
 * Created by Deretor on 27.03.2015.
 */

(function(){
    var app = angular.module('app');

    app.factory('loginRepository',['$q','$location','$http',repoFunc]);
    var baseUrl = '/kto/req/';
    function repoFunc($q,$location,$http){
        mockLoginArr=[
            {
                login: 'adminStud',
                password : '12345'
            }

        ];
        var addUser = function(user){
            mockLoginArr.push(user);
        };

       var testLogin = function(user){
           var config = {
                method: 'post',
               url: baseUrl + 'checkUser'

           };
           //var req = {
           //  username: user,
           //    password: password
           //};
            var promise = $http(config,user);
         //for(var log in mockLoginArr){
         //    if(mockLoginArr[log].login === user.login && mockLoginArr[log].password === user.password )
         //       return true;
         //}
         //  return false;
       };

        return  {
            addUser : addUser,
            testUser : testLogin
        }

    }

})();