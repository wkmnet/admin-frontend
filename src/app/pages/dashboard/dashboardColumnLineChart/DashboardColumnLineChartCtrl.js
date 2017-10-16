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
        .controller('DashboardColumnLineChartCtrl', DashboardColumnLineChartCtrl);

    /** @ngInject */
    function DashboardColumnLineChartCtrl($scope, $http, toastr, baConfig, layoutPaths, baUtil) {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

        function createNewChart(){
            var chart = AmCharts.makeChart("tradeVolume", {
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
                        "title": "总单数",
                        "type": "column",
                        "valueField": "totalTrade"
                    },
                    {
                        "balloonText": "[[date]]的[[title]]:[[value]]",
                        "bullet": "round",
                        "id": "AmGraph-2",
                        "labelText": "[[value]]",
                        "lineThickness": 2,
                        "title": "成功单数",
                        "valueField": "successTrade"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "单数"
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
                        "text": "近三十天下单总量和交易成功单量汇总"
                    }
                ],
                "dataProvider": $scope.data.list
            });
        }

        $scope.data = {};

        function loadCurrentTrade() {
            $http.get("/api/order/history").success(function(resp){
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