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

    angular.module("BlurAdmin.pages.tool.user",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('tool.user', {
                url: '/user',
                templateUrl: 'app/pages/tool/user/user_list.html',
                controller: "UserListCtrl",
                title: 'User管理',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                }
            })
    }
})();