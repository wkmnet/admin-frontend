/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.log', [
    'BlurAdmin.pages.log.list',
    'BlurAdmin.pages.log.apple',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('log', {
          url: '/log',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '日志管理',
          sidebarMeta: {
            icon: 'ion-ios-paper-outline',
            order: 100,
          },
        });
  }

})();
