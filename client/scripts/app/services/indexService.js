/**
 * Created by Deretor on 06.03.2015.
 */
(function(){
    var app = angular.module('app');
    var name = 'indexService';
    app.factory(name, ['$location', 'indexRepository', indexServiceF]);

    function indexServiceF($location, indexRepository){
        var getingBook = null;
        getingBook=indexRepository.getBook();
       var getBook = function(){
           if(getingBook === null)
               getingBook=indexRepository.getBook();
           return getingBook;
       };
        // в клиент-серверном приложении - это логика сервера;
        var parseBookDiv = function(div,path){
            var currentListItem = {};
                if(typeof div.content == "object" && div.content.length !== 0){
                    currentListItem.name = div.name;
                    currentListItem.path = path + '/' +currentListItem.name;
                    if(div.author)currentListItem.author = div.author;
                    if(div.publisher)currentListItem.publisher = div.publisher;
                    if(div.type)currentListItem.type = div.type;
                    if(!currentListItem.includes) currentListItem.includes = [];
                    for(var i=0; i < div.content.length; i++){
                        currentListItem.includes.push(parseBookDiv(div.content[i],currentListItem.path));
                    }
                }
                if(typeof div.content === "string" || !div.content || div.content.length == 0){
                    currentListItem.name = div.name;
                    currentListItem.includes = [];
                    currentListItem.path = path + '/'+ currentListItem.name;
                    if(div.author)currentListItem.author = div.author;
                    if(div.publisher)currentListItem.publisher = div.publisher;
                    if(div.type)currentListItem.type = div.type;
                }
            return currentListItem;
        };


        var getBookContentList = function(){
            var path = '';
            var book = getBook();
            var bookContentList=[];
            bookContentList.push(parseBookDiv(book,path));
            console.info('book parsed',bookContentList);
            return bookContentList;
        };

        var getSubscrParams = function(path){
              //var path = $location.path();
                var params = path.split('/');
                params.splice(0,1);
            console.log('params',params);
            return params;
        };
        var getBookDiv = function(pathE){
            var sParam = getSubscrParams(pathE);
            console.log('sparam',sParam);
            var book = getBook();
            var div = book;
            console.log('1stDiv',div);
            console.log(div,book);
            //var path = div.name;
            var path = '';
            if(sParam.length > 1) {
                for (var i = 1; i < sParam.length; i++) {
                    if(path != '')path += ' -> ';
                     path+= div.name+' ';
                    console.log('aaa',div.content,sParam[i],i,path);
                    var DM = div.content.filter(function(item){
                        return item.name === sParam[i];
                    });
                    console.log(DM);
                    if(DM.length > 1) return {path: path, content: {type: 'html/text',text:' More then 1 item with some path'}};
                    if(DM.length === 0) return {    path: path,
                        content: {
                            text: 'Not found',
                            type: 'html/text',
                            dm: DM
                        }
                    };
                    if(DM.length === 1){
                        if(i === sParam.length-1){
                            console.log(typeof DM[0].content);
                            return {path: path +=' -> '+DM[0].name, content:{
                                text: DM[0].text || '',
                                templateUrl: DM[0].templateUrl || '',
                                type: DM[0].type
                            }}
                        }
                        if(typeof DM[0].content === 'object'){
                            div = DM[0];
                        }
                        if(typeof DM[0].content !== 'object'){
                            return {
                                path :  path +=' -> '+DM[0].name,
                                content : {type: 'html/text',text:' Not found'}
                            }
                        }
                    }

            }
            }
            else{
                //alert(sParam[0] +' | '+div.name);
                if(sParam[0] == div.name){
                    return {path:  div.name,
                        content :{
                            text: div.text || 'Выберите главу',
                            type: div.type || 'html/text',
                            templateUrl: div.templateUrl
                        }
                    }
                }
            }

        };
        return{
            getChapter: getBookDiv,
            getList: getBookContentList
        }
    }

})();