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
        var parseBookDiv = function(div){
            var currentListItem = {};
                if(typeof div.content == "object"){
                    currentListItem.name = div.name;
                    if(!currentListItem.includes) currentListItem.includes = [];
                    for(var i=0; i < div.content.length; i++){
                        currentListItem.includes.push(parseBookDiv(div.content[i]));
                    }
                }
                if(typeof div.content === "string"){
                    currentListItem.name = div.name;
                    currentListItem.includes = [];
                }
            return currentListItem;
        };


        var getBookContentList = function(){
            var book = getBook();
            var bookContentList = parseBookDiv(book);
            console.info(bookContentList);
            return bookContentList;
        };

        var getSubscrParams = function(){
              var path = $location.path();
                var params = path.split('/');
            return params;
        };
        var getBookDiv = function(){
            var sParam = getSubscrParams();
            var book = getBook();
            var div = book;
            console.log(div,book);
            var path = '';
            if(sParam.length > 1) {
                for (var i = 1; i < sParam.length; i++) {
                    path += ' -> ' + div.name;
                    console.log('aaa');
                    var DM = div.content.filter(function(item){
                        return item.name === sParam[i];
                    });
                    console.log(DM);
                    if(DM.length > 1) return {path: path, content: ' More then 1 item with some path'};
                    if(DM.length === 0) return {    path: path,
                        content: 'Not found'};
                    if(DM.length === 1){
                        if(typeof DM[0].content === 'object'){

                            if(i === sParam.length-1){
                                console.log(typeof DM[0].content);
                                return {path: path, content: DM[0].content}};
                            div = DM[0];

                        }
                        if(typeof DM[0].content === 'string'){
                            return {
                                path : path,
                                content : DM[0].content
                            }
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