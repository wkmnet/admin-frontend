/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午5:59
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.log.apple')
        .controller('AppleNotifyListCtrl', AppleNotifyListCtrl);

    /** @ngInject */
    function AppleNotifyListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {

        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryAppleNotifyResult = function () {
            cfpLoadingBar.start();
            var url = "/api/balance/result?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "") +
                "&transaction_id=" + ($scope.param.transaction_id || "") +
                "&out_trade_no=" + ($scope.param.out_trade_no || "");
            
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                 //   $scope.createBtn();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryAppleNotifyResult();
        }

       /* $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryMerchant();
        };*/

        $scope.queryAppleNotifyResult();

   /*     $scope.btns = [];
        $scope.createBtn = function(){
            $scope.btns = [];
            //var num = Math.ceil($scope.data.totalRow /  $scope.data.pageSize);
            var num = $scope.data.totalPage;
            console.log("num : " + num);
            for (var i = 0;i< num;i++) {
                $scope.btns.push(i);
            }
            console.log("btns : " + $scope.btns);
        };*/

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

    }

})();