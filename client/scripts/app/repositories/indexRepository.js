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
            publisher: 'Q'+'&#39'+'railly',
            content: [
                {
                    name: 'Часть I. Основы JavaScript',
                    type: 'nonText',
                    index: 0,
                    content: [
                        {
                            name: 'Функции',
                            index: 0,
                            content: [],
                            text: '<H1>Функции</H1>' +
                            '<p>Функция – это блок программного кода на языке JavaScript, который определяется один раз и может вызываться многократно. Функции могут иметь пара'+
                        'метры, или аргументы, – локальные переменные, значения которых определя'+
                        'ются при вызове функции. Функции часто используют свои аргументы для вы'+
                        'числения возвращаемого значения, которое является значением выражения вы'+
                        'зова функции. Если функция вызывается в контексте объекта, она называется '+
                        'методом, а сам объект передается ей в виде неявного аргумента. Вероятно, вы '+
        'уже знакомы с концепцией функции, если встречались с такими понятиями,'+
            'как подпрограмма и процедура.. </p>'+
                            '<p>If a function is assigned to the property of an object, it is known as a method of that'+
                            'object. When a function is invoked on or through an object, that object is the invocation'+
                            'context or this value for the function. Functions designed to initialize a newly created'+
                            'object are called constructors. Constructors were described in §6.1 and will be covered'+
                            'again in Chapter 9.</p>'+
                            '<p>In JavaScript, functions are objects, and they can be manipulated by programs. JavaScript'+
                            'can assign functions to variables and pass them to other functions, for example.<p>'+
                            '<p>Since functions are objects, you can set properties on them, and even invoke methods'+
                            'on them.</p>'+
                            '<p>JavaScript function definitions can be nested within other functions, and they have'+
                            'access to any variables that are in scope where they are defined. This means that JavaScript'+
                            'functions are closures, and it enables important and powerful programming'+
                            'techniques.</p>',
                            type: 'chapter'
                        }
                    ]
                },
                {
                    name: '2aaa',
                    content: [
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