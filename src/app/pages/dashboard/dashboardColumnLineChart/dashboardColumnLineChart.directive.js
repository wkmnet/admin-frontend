/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-10-13
 * Time : 上午11:11
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .directive('dashboardColumnLineChart', dashboardColumnLineChart);

    /** @ngInject */
    function dashboardColumnLineChart() {
        return {
            restrict: 'E',
            controller: 'DashboardColumnLineChartCtrl',
            templateUrl: 'app/pages/dashboard/dashboardColumnLineChart/dashboardColumnLineChart.html'
        };
    }
})();