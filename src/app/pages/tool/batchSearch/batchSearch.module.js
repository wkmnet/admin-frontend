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

    angular.module("BlurAdmin.pages.tool.batchSearch",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('tool.batchSearch', {
                url: '/batchSearch',
                templateUrl: 'app/pages/tool/batchSearch/batchSearch_list.html',
                controller: "BatchSearchListCtrl",
                title: '批量查询用户',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                }
            })
    }
})();