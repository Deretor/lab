/**
 * Created by Deretor on 27.03.2015.
 */

(function (){
    var app = angular.module('app');

    app.controller = ('loginController',['$scope','loginService', contrFunction]);

    function contrFunction($scope, loginService){

        var addUser = function(user){
            loginRepository.addUser(user);
        };
        var testUser = function(user){
            return  loginRepository.testUser(user);
        };

        return  {
            addUser : addUser,
            testUser : testUser
        }

    }

})();
