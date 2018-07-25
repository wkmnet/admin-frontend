/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:44
 * ---------------------------------
 *
 */
(function () {
    'use strict';

    angular.module("BlurAdmin.pages.tool.createOrder",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('tool.createOrder', {
                url: '/createOrder',
                templateUrl: 'app/pages/tool/createOrder/create_order.html',
                controller: "CreateOrderCtrl",
                title: '扫码支付',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                }
            })
    }
})();