/**
 * Created by Deretor on 06.03.2015.
 */
(function(){
    var app = angular.module('app');
    var name = 'indexRepository';
    app.factory(name, [indexRepositoryF]);


    function indexRepositoryF(){
        var book = {
            name: 'JavaScript: The Definitive Guide',
            index: 0,
            author:'David Flanagan',
            publisher: 'O'+'&#39'+'REILLY',
            text: '<p> ' +
            'Пятое издание бестселлера «JavaScript. Подробное руководство» полностью обновлено.' +
            'Часть I знакомит с основами JavaScript'+
            '</p>',
            type: 'html/text',
            content: [
                {
                    name: 'Часть I. Основы JavaScript',
                    type: 'nonText',
                    index: 0,
                    content: [
                        {
                            name: 'Функции',
                            index: 0,
                            text: '2',
                            templateUrl: 'pages/function.html',
                            type: 'html/urlTemplate',
                            content: [
                                {
                                 name: 'Вызов и определение функции',
                                 text: '',
                                 type: 'html/urlTemplate',
                                 templateUrl: 'pages/Function/1_functionInitAndCall.html',
                                 content:[{
                                     name: 'Вложенные функции',
                                        text: '',
                                        type: 'html/urlTemplate',
                                        templateUrl: 'pages/Function/functionInitAndCall/1_IncludedFunction.html',
                                        content:[
                                    ] },
                                     {
                                         name: 'Литералы функций',
                                         text: '',
                                         type: 'html/urlTemplate',
                                         templateUrl: 'pages/Function/functionInitAndCall/2_functonalLiteral.html',
                                         content:[
                                         ] },
                                     {
                                         name: 'Вопросы для самопроверки',
                                         text: '',
                                         type: 'html/urlTemplate',
                                         templateUrl: 'pages/Function/functionInitAndCall/1q_Questions.html',
                                         content:[
                                         ] }
                                 ]
                                },
                                {
                                    name: 'Аргументы функции',
                                    text: '',
                                    type: 'html/urlTemplate',
                                    templateUrl: 'pages/Function/2_functionArguments.html',
                                    content:[
                                        {
                                            name: 'Необязательные аргументы',
                                            text: '',
                                            type: 'html/urlTemplate',
                                            templateUrl: 'pages/Function/functionArguments/1_optionaArguments.html',
                                            content:[
                                            ] },
                                        {
                                            name: 'Список аргументов',
                                            text: '',
                                            type: 'html/urlTemplate',
                                            templateUrl: 'pages/Function/functionArguments/2_argumentsList.html',
                                            content:[
                                            ] },
                                        {
                                            name: 'Свойство как аргумент',
                                            text: '',
                                            type: 'html/urlTemplate',
                                            templateUrl: 'pages/Function/functionArguments/3_propertyLikeArgument.html',
                                            content:[
                                            ] },
                                        {
                                            name: 'Вопросы для самопроверки',
                                            text: '',
                                            type: 'html/urlTemplate',
                                            templateUrl: 'pages/Function/functionArguments/2q_Questions.html',
                                            content:[
                                            ] }
                                    ]
                                },
                                {
                                    name: 'Функции как данные',
                                    text: '',
                                    type: 'html/urlTemplate',
                                    templateUrl: 'pages/Function/3_functionLikeData.html',
                                    content:[
                                        {
                                            name: 'Вопросы для самопроверки',
                                            text: '',
                                            type: 'html/urlTemplate',
                                            templateUrl: 'pages/Function/FunctionLikeData/3q_Questions.html',
                                            content:[
                                            ] }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Тест на усвоение темы',
                            text: '',
                            type: 'html/urlTemplate',
                            templateUrl: 'pages/TestPage.html',
                            content:[
                            ]
                        }

                    ]
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