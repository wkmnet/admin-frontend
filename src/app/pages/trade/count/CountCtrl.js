
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.trade.count')
        .controller('CountCtrl', CountCtrl);

    /** @ngInject */
    function CountCtrl($scope, $http, baConfig,toastr,cfpLoadingBar) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.query = {};

        $scope.showDatePicker = false;
        
        $scope.channel = {};

        $scope.queryHistoryTrade = function () {
            cfpLoadingBar.start();
            var url = "/api/history/report?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&order_no=" + ($scope.param.order_no || "") +
                "&out_trade_no=" + ($scope.param.out_pay_order || "") +
                "&channel=" + ($scope.param.channel || "") +
                "&status=" + ($scope.param.status || "") +
                "&trans_type=" + ($scope.param.trans_type || "") +
                "&tags=" + ($scope.param.tags || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "");

            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };

        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryHistoryTrade();
        }
        
        $scope.queryHistoryTrade();

        $scope.selectDate = function () {
            $scope.showDatePicker = !$scope.showDatePicker;
        }

        $scope.changeDate = function (modelName, newDate) {
            console.log("modelName:" + modelName + "---newDate:" + newDate);
            if("start" == modelName){
                $scope.param.start = newDate.format("YYYY-MM-DD");
            } else {
                $scope.param.end = newDate.format("YYYY-MM-DD");
            }
        }

        $scope.clearDate = function () {
            $scope.param.start = "";
            $scope.param.end = "";
        }

        $scope.closeDatePicker = function () {
            $scope.showDatePicker = false;
        }
        
        //查询渠道
        $scope.selectChannel = function () {
            var url = "/api/merchant/list";
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.channel = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
            
        };
        $scope.selectChannel();

        $scope.createExcel = function(){
            var url = "/api/history/report/excel?" +
                "&order_no=" + ($scope.param.order_no || "") +
                "&out_trade_no=" + ($scope.param.out_pay_order || "") +
                "&channel=" + ($scope.param.channel || "") +
                "&status=" + ($scope.param.status || "") +
                "&trans_type=" + ($scope.param.trans_type || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "");
            $http.get(url).success(function (resp) {
                console.log("resp:",resp);
                if(resp.success){
                    $scope.fileUrl = resp.data;
                    window.location.href = $scope.fileUrl;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };



        $scope.showChart = false;
        $scope.createReport = function () {
            var url = "/api/history/report/count?" +
                "&order_no=" + ($scope.param.order_no || "") +
                "&out_trade_no=" + ($scope.param.out_pay_order || "") +
                "&channel=" + ($scope.param.channel || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "");
            $http.get(url).success(function (resp) {
                if(resp.success){
                    $scope.report = resp.data
                    createNewChart();
                    $scope.showChart = true;
                }else{
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

        
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
                        "text": "近" +$scope.report.header.days+"天下单总量和交易成功单量汇总"
                    }
                ],
                "dataProvider": $scope.report.list
            });
        }




    };

})();