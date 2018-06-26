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
        .controller('DashboardColumnLineYearAmountChartCtrl', DashboardColumnLineYearAmountChartCtrl);

    /** @ngInject */
    function DashboardColumnLineYearAmountChartCtrl($scope, $http, toastr, baConfig, layoutPaths, baUtil) {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

        function createNewChart(){
            var chart = AmCharts.makeChart("tradeYearAmountVolume", {
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
                        "title": "交易金额",
                        "type": "column",
                        "valueField": "totalAmount"
                    },
                    {
                        "balloonText": "[[date]]的[[title]]:[[value]]",
                        "bullet": "round",
                        "id": "AmGraph-2",
                        "labelText": "[[value]]",
                        "lineThickness": 2,
                        "title": "成功金额",
                        "valueField": "successAmount"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "金额（元）"
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
                        "text": "近三十年订单交易金额和成功金额汇总"
                    }
                ],
                "dataProvider": $scope.data.list
            });
        }

        $scope.data = {};

        function loadHistoryYearTrade() {
            $http.get("/api/order/year_amount").success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                    createNewChart();
                } else {
                    toastr.error(resp.message)
                }
            });
        }

        loadHistoryYearTrade();
    }
})();