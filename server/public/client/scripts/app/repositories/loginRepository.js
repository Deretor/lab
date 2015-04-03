/**
 * Created by Deretor on 27.03.2015.
 */

(function(){
    var app = angular.module('app');

    app.factory('loginRepository',[repoFunc]);

    function repoFunc(loginRepository){
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
         for(var log in mockLoginArr){
             if(mockLoginArr[log].login === user.login && mockLoginArr[log].password === user.password )
                return true;
         }
           return false;
       };

        return  {
            addUser : addUser,
            testUser : testLogin
        }

    }

})();