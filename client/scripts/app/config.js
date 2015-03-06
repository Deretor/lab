(function(){
    angular.module('app').config(['$adConfigProvider', function ($adConfigProvider) {
        $adConfigProvider.paging.response = {
            totalItems: 'results.opensearch:totalResults',
            itemsLocation: 'results.data'
        };
    }]);
})();