
(function () {
    'use strict';

    angular.module("BlurAdmin.pages.trade.count",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('trade.count', {
                url: '/count',
                templateUrl: 'app/pages/trade/count/count_list.html',
                controller: "CountCtrl",
                title: '报表管理',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            });
    }
})();