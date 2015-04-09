/**
 * Created by Deretor on 27.03.2015.
 */

(function (){
    var app = angular.module('app');
    app.controller('loginController', ['$scope','$location', 'loginService', contrFunction]);

    function contrFunction($scope,$location, loginService){
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
            console.log('user test start');
            var user = {
                login : vm.loginLog,
                password : vm.loginPass
            };
           loginService.testUser(user).then(function(res){
             console.log(res);
               if(res.autorize === "true"){
                    if(res.role == 'teacher'){
                        window.location.pathname='/app';
                    }
                   else{
                        window.location.pathname='/book.html';
                    }
               }
               else{
                   //alert('wrong login or password');
               }

           });
            console.log(user);
        };
        vm.submitLogin = function(){
            testUser();
        };
        vm.toBook = function(){
            window.location.pathname='/book.html';
        };
        vm.toTeacher = function(){
            console.log('aaa');
            window.location.pathname='/teacherPage';

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
