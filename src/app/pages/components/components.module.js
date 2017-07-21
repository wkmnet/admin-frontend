/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components', [
    'BlurAdmin.pages.components.mail',
    'BlurAdmin.pages.components.timeline',
    'BlurAdmin.pages.components.tree',
    'BlurAdmin.pages.components.upload',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('components', {
          url: '/components',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '组件',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 100,
          },
        });
  }

})();
