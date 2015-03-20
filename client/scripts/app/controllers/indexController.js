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
        vm.questionTemplate = [];
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
            //vm.ch.content.templateUrl = 'pages/function.html';
            //vm.ch.content.type = 'html/text';
            console.log(vm.ch.content);
        };

        vm.form = {};

        function getQuestions(){
            //console.info('123');
            vm.questionTemplate = indexService.getQuestions();
            //console.info('kttttttt ',vm.questionTemplate)
        }
        getQuestions();

        vm.act=function(){
            console.log(arguments);
        };
        vm.right = function(res,id){
          console.log(arguments);
            console.log($('#collapse'+id+'right'));
          if(res == vm.form[id]){
              $('#collapse'+id+'right').css('height', 0);
            $('#collapse'+id+'right').animate({
                height : '3%'
            },300);
            $('#help'+id+'help').css({'height' : 0});
            return true;
          }

            $('#collapse'+id+'help').css('height' , 0);
            $('#collapse'+id+'help').animate({
                height : '3%'
            },300);
            $('#help'+id+'right').css('height', 0);
            return false;
            //console.log($('#form'+id+'>input').type());
        };
        vm.arr = function(){console.log(vm.form)};
        console.log(vm.form);


    }

})();