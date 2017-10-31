/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('popularApp', popularApp);

  /** @ngInject */
  function popularApp() {
    return {
      restrict: 'E',
      controller: 'PopularAppCtrl',
      templateUrl: 'app/pages/dashboard/popularApp/popularApp.html'
    };
  }
})();