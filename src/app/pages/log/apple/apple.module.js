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

    angular.module("BlurAdmin.pages.log.apple",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('log.coin', {
                url: '/apple_result_list',
                templateUrl: 'app/pages/log/apple/apple_list.html',
                controller: "AppleNotifyListCtrl",
                title: '苹果内购',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            });
    }
})();