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
        var rootPath = vm.bookContentList[0].path;
        console.log('rp',rootPath);

        vm.ch = indexService.getChapter(rootPath);
        console.log('ch+',vm.bookContentList,vm.ch);
        vm.bookAuthor = vm.bookContentList[0].author;
        vm.bookPublisher = vm.bookContentList[0].publisher;


        vm.redirectClick = function(path){
            console.log('p',path);
            vm.ch = indexService.getChapter(path);
            console.log('returned',vm.ch);
            vm.ch.content.tempUrl = 'pages/function.html';
            vm.ch.content.type = 'html/text';
        }
    }

})();