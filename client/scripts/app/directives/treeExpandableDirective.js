/**
 * Created by labutineg on 11.07.2014.
 *
 * @license
 * treeDirective
 */

(function () {
    "use strict";

    angular.module('app').directive("treeExpandableDirective", ['$compile', function ($compile) {
        return {
            restrict: "AE",
            replace: false,
            transclude: true,
            scope: {
                /**@expose*/
                family: '=',
                /**@expose*/
                children: '@',
                /**@expose*/
                handler: '&',
                search2: '='



            },
            template:   '<div class="container" data-ng-repeat="child in family | filter: search2">' +
                            '<div data-ng-class="{collapser:isExpand[$index], expander: !isExpand[$index]}"' +
                            'data-ng-init="onInit($index, family.length)" data-ng-click="onExpandClick($index)" data-ng-if="child[children].length > 0">&nbsp</div>' +
                            '<div class="content" data-ng-transclude></div>' +
                            '<tree-expandable-directive data-ng-if="checkExpand($index)" data-family="child[children]" data-children="{{children}}"> ' +
                                '<div ng-transclude></div>' +
                            '</tree-directive>' +
                        '</div>',
            compile: function (tElement, tAttr, transclude) {
                // Normalize the link parameter
                if (angular.isFunction(tAttr)) {
                    tAttr = { post: tAttr };
                }
                //console.log('asdasdasdasd',scope.family, scope.children);


                var contents = tElement.contents().remove();
                var compiledContents;
                return {
                    pre: (tAttr && tAttr.pre) ? tAttr.pre : null,
                    /**
                     * Compiles and re-adds the contents
                     */

                    post: function (scope, iElement, iAttr) {
                        var ctrlScope;
                        //drop down function from controller to recursived directives
                        for (ctrlScope in scope.$parent) {
                            if (ctrlScope.charAt(0) == "$" || (scope[ctrlScope]&& ctrlScope!= 'handler' )) continue;
                            scope[ctrlScope] = scope.$parent[ctrlScope];

                        }

                        //make directive recursive
                        if (!compiledContents) {
                            compiledContents = $compile(contents, transclude);
                        }

                        //make directive recursive
                        compiledContents(scope, function (clone, scope) {
                            iElement.append(clone);
                        });

                        /**@expose*/
                        scope.isExpand = {};
                        console.log(scope.family,scope.children);

                        /**@expose*/
                        scope.onInit = function (index, length) {
                            if (length > 1) scope.isExpand[index] = false;
                            if (length <= 1) {scope.isExpand[index] = true;
                                if (scope.handler)
                                     {
                                         scope.handler({type: "onExpand", status: scope.isExpand[index], child: scope.family[index]});
                                     }
                            }
                        };

                        /**@expose*/
                        scope.onExpandClick = function (index) {
                            scope.isExpand[index] = !scope.isExpand[index];

                            if (scope.handler)
                            { scope.handler({type: "onExpand", status: scope.isExpand[index], child: scope.family[index]});}

                        };

                        /**@expose*/
                        scope.checkExpand = function (index) {
                            return scope.isExpand[index];
                        };
                    }
                };
            }
        };
    }]);
})();