/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-10-31
 * Time : 上午11:02
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('PopularAppCtrl', PopularAppCtrl);

    /** @ngInject */
    function PopularAppCtrl($scope, $http, toastr, baConfig, layoutPaths, baUtil) {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

        $scope.data = {};

        function loadHistoryTrade() {
            $http.get("/api/order/historyCount").success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message)
                }
            });
        }
        loadHistoryTrade();
    }
})();