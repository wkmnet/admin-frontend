/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:16
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.trade",["BlurAdmin.pages.trade.current","BlurAdmin.pages.trade.history","BlurAdmin.pages.trade.count","BlurAdmin.pages.trade.coin"]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('trade', {
                url: '/trade',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '订单管理',
                sidebarMeta: {
                    icon: 'ion-social-yen',
                    order: 40,
                },
            });
    }
})();