/**
 * Created by Deretor on 06.03.2015.
 */
(function(){
    var app = angular.module('app');
    var name = 'indexRepository';
    app.factory(name, [indexRepositoryF]);


    function indexRepositoryF(){
        var book = {
            name: 'c++ prop',
            author: 'SAMBODY',
            content: [
                {
                    name: '1aaa',
                    content: '',
                    text:'',
                    type: 'volume'
                },
                {
                    name: '2aaa',
                    content: [
                        {
                            name: '2.1',
                            content: 'lorun;jskadn;vaksjdhbvladkjhvaksdjhvkjasdh 22222222',
                            type: 'chapter'
                        }
                    ],
                    type: 'volume'
                }
            ]
        };

        var getBook = function(){
            return book;
        };


        return {
            getBook: getBook
        }
    }

})();