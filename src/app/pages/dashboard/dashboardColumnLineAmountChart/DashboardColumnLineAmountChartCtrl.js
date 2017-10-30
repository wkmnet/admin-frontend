/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-10-13
 * Time : 上午11:12
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardColumnLineAmountChartCtrl', DashboardColumnLineAmountChartCtrl);

    /** @ngInject */
    function DashboardColumnLineAmountChartCtrl($scope, $http, toastr, baConfig, layoutPaths, baUtil) {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

        function createNewChart(){
            var chart = AmCharts.makeChart("tradeAmountVolume", {
                "type": "serial",
                "categoryField": "date",
                "startDuration": 1,
                "theme": "light",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 60
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[date]]的[[title]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "labelText": "[[value]]",
                        "title": "成功单数",
                        "type": "column",
                        "valueField": "successTrade"
                    },
                    {
                        "balloonText": "[[date]]的[[title]]:[[value]]",
                        "bullet": "round",
                        "id": "AmGraph-2",
                        "labelText": "[[value]]",
                        "lineThickness": 2,
                        "title": "订单金额",
                        "valueField": "successAmount"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "成功单数"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "近三十天下单交易成功单数和交易金额汇总"
                    }
                ],
                "dataProvider": $scope.data.list
            });
        }

        $scope.data = {};

        function loadCurrentTrade() {
            $http.get("/api/order/historyAmount").success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                    createNewChart();
                } else {
                    toastr.error(resp.message)
                }
            });
        }

        loadCurrentTrade();
    }
})();