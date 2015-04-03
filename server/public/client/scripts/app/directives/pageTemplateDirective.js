/**
 * Created by Deretor on 13.03.2015.
 */
var app = angular.module('app');

    app.directive('pageTemplate', function() {
        return {
            restrict: 'AE',
            scope: {
              url : '='
            },
            templateUrl: url
        }
    });
