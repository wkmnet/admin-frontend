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

    angular.module("BlurAdmin.pages.message",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('message', {
                url: '/list',
                templateUrl: 'app/pages/message/list.html',
                controller: "MessageCtrl",
                title: '消息管理',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 50,
                },
            });
    }
})();