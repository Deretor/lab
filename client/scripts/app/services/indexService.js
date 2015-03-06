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
            var path = '';
            if(sParam.length > 1) {
                for (var i = 1; i < sParam.length(); i++) {
                    path += ' -> ' + div.name;
                    var index = div.content.indexOf(sParam[i]);
                    if (typeof  div === 'string')
                        break;
                    div = div.content[index];
                }
                return {
                    path: path,
                    content: div.content
                };
            }
            return{
                path: path,
                content: 'Nothing'
            };



        };
        return{
            getChapter: getBookDiv,
            getList: getBookContentList
        }
    }

})();