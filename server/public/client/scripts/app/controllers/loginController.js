/**
 * Created by Deretor on 27.03.2015.
 */

(function (){
    var app = angular.module('app');
    app.controller('loginController', ['$scope', 'loginService', contrFunction]);

    function contrFunction($scope, loginService){
        var vm=this;
        vm.modeAr=['login','registr'];
        vm.Vmode = vm.modeAr[0];

        vm.addUser = function(){
            var user = {
                group: vm.regGr,
                login : vm.regLog,
                password : vm.regPass

            };
            loginService.addUser(user);
        };
        var testUser = function(){
            var user = {
                login : vm.loginLog,
                password : vm.loginPass
            };
           loginService.testUser(user);
            console.log(user);
        };

        vm.toReg = function(){
            if(vm.Vmode == vm.modeAr[0])
            {
                vm.Vmode = vm.modeAr[1];
            }else{
                vm.Vmode = vm.modeAr[0];
            }
        };
    }

})();
