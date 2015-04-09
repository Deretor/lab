/**
 * Created by zarew_000 on 09.04.2015.
 */
(function(){
    var app = angular.module('app');
    var controllerName = 'indexController';
    app.controller('teacherController', ['$scope','$q','$location','$http', 'indexService', indexControllerF]);

    function indexControllerF($scope,$q,$location,$http, indexService){

        var vm=this;
        //vm.new11 = 'sdfjkn;vajs;djav';
        //vm.directory = 'Содержание';
        //vm.questionTemplate = [];
        //vm.bookContentList = indexService.getList();
        ////vm.bookContentList=[];
        ////vm.bookContentList.push(indexService.getList());
        //vm.bookname = 'Страница преподавателя';
        //var rootPath = vm.bookContentList[0].path;
        //console.log('rp',rootPath);

        //vm.ch = indexService.getChapter(rootPath);
        //console.log('ch+',vm.bookContentList,vm.ch);
        //vm.bookAuthor = vm.bookContentList[0].author;
        //vm.bookPublisher = vm.bookContentList[0].publisher;
        vm.view = [];
        vm.testQ=[];
        vm.userT=[];
        vm.groups=[];
        vm.tamplatePage='../../client/pages/';
        //vm.redirectClick = function(path){
        //    console.log('p',path);
        //    vm.ch = indexService.getChapter(path);
        //    console.log('returned',vm.ch);
        //    //vm.ch.content.templateUrl = 'pages/function.html';
        //    //vm.ch.content.type = 'html/text';
        //    console.log(vm.ch.content);
        //};

        vm.form = {};

        function getQuestions(){
            //console.info('123');
            vm.questionTemplate = indexService.getQuestions();
            vm.questionAnswer =[];
            //console.info('kttttttt ',vm.questionTemplate)
        }
        getQuestions();

        vm.act=function(){
            console.log(arguments);
        };


        vm.right = function(res,id){
            if(res == vm.form[id]){vm.questionAnswer[id]=true}
            else {vm.questionAnswer[id]= false}
            console.log(arguments);

        };
        //app.factory('loginRepository',['$q','$location','$http',repoFunc]);
        var baseUrl = '/kto/req/';


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

            //var addUser = function(user){
            //    mockLoginArr.push(user);
            //};
            var baseUrl = '/kto/req/';
            var getUserI = function(user){
                var config = {
                    method: 'get',
                    url: baseUrl + 'userT'
                };
                return callServiceAsync(config.method,config.url);

            };

        var gettestQ = function(user){
                var config = {
                    method: 'get',
                    url: baseUrl + 'testQ'
                };
                return callServiceAsync(config.method,config.url);

            };
        gettestQ().then(function(res1){
            getUserI().then(function(res){
                for(var item in res){
                    if(res[item].role == 'student'){
                        consoole.log('!!!!VAaaaaaaaa fuck');
                    }
                }
                vm.userT = res;
                vm.testQ = res1;
                viewMapping(vm.userT,vm.testQ);
            });
        });

        function viewMapping(userT,testQ){
            vm.groups = [];
            for(var i=0;i<userT.length;i++){
                if(vm.groups.indexOf(userT[i].group) == -1)
                {
                    vm.groups.push(userT[i].group);
                }
            }
            console.log('gr',vm.groups);
        }
        vm.arr = function(){console.log(vm.form)};
        console.log(vm.form);


    }

})();
