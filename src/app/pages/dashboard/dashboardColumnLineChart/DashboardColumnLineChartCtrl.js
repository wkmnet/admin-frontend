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
                "categoryField": "category",
                "startDuration": 1,
                "theme": "light",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[category]]的[[title]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "labelText": "[[value]]",
                        "title": "总单数",
                        "type": "column",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "[[category]]的[[title]]:[[value]]",
                        "bullet": "round",
                        "id": "AmGraph-2",
                        "labelText": "[[value]]",
                        "lineThickness": 2,
                        "title": "成功单数",
                        "valueField": "column-2"
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
                "dataProvider": [
                    {
                        "category": "category 1",
                        "column-1": 8,
                        "column-2": 5
                    },
                    {
                        "category": "category 2",
                        "column-1": 6,
                        "column-2": 8
                    },
                    {
                        "category": "category 3",
                        "column-1": 2,
                        "column-2": 5
                    },
                    {
                        "category": "category 4",
                        "column-1": 9,
                        "column-2": 2
                    },
                    {
                        "category": "category 5",
                        "column-1": 4,
                        "column-2": 3
                    },
                    {
                        "category": "category 6",
                        "column-1": 8,
                        "column-2": 6
                    },
                    {
                        "category": "category 7",
                        "column-1": 1,
                        "column-2": 5
                    },
                    {
                        "category": "category 8",
                        "column-1": 5,
                        "column-2": 6
                    },
                    {
                        "category": "category 9",
                        "column-1": 6,
                        "column-2": 5
                    },
                    {
                        "category": "category 10",
                        "column-1": 9,
                        "column-2": 9
                    }
                ]
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

        createNewChart();
    }
})();