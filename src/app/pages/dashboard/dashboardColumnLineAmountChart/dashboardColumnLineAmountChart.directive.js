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
        .directive('dashboardColumnLineAmountChart', dashboardColumnLineAmountChart);

    /** @ngInject */
    function dashboardColumnLineAmountChart() {
        return {
            restrict: 'E',
            controller: 'DashboardColumnLineAmountChartCtrl',
            templateUrl: 'app/pages/dashboard/dashboardColumnLineAmountChart/dashboardColumnLineAmountChart.html'
        };
    }
})();