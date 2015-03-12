/**
 * Created by Deretor on 06.03.2015.
 */
(function(){
    var app = angular.module('app');
    var controllerName = 'indexController';
    app.controller('indexController', ['$scope', 'indexService', indexControllerF]);

    function indexControllerF($scope, indexService){

        var vm=this;
        vm.new11 = 'sdfjkn;vajs;djav';
        vm.directory = 'Содержание';

        vm.bookContentList = indexService.getList();
        //vm.bookContentList=[];
        //vm.bookContentList.push(indexService.getList());
        vm.bookname = vm.bookContentList[0].name;
        var Ch = indexService.getChapter();
        console.log(vm.bookContentList,Ch);

        //$scope.collapser = 'fa fa-'
    }

})();