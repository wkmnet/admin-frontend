/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午5:52
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.trade.coin",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('trade.coin', {
                url: '/coin_list',
                templateUrl: 'app/pages/trade/coin/coin_list.html',
                controller: "CoinListCtrl",
                title: '用户账户',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 200,
                },
            });
    }
})();