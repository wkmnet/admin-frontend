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

    angular.module('BlurAdmin.pages.trade.coin')
        .controller('CoinListCtrl', CoinListCtrl);

    /** @ngInject */
    function CoinListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {

        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryUserAmount = function () {
            cfpLoadingBar.start();
            var url = "/api/balance?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&user_id=" + ($scope.param.user_id || "") +
                "&trade_ref_id=" + ($scope.param.trade_ref_id || "") +
                "&trade_type=" + ($scope.param.trade_type || "") +
                "&trade_ref_code=" + ($scope.param.trade_ref_code || "");
            
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
            $scope.queryUserAmount();
        }

       /* $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryMerchant();
        };*/

        $scope.queryUserAmount();

        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除【' + name +'】支付渠道吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteMerchant(id);
                }
            });
        };

        $scope.deleteMerchant = function (id) {
            $http.delete("/api/merchant/" + id).success(function(resp){
                if(resp.success){
                    $scope.queryMerchant();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

        $scope.switchStatus = function(id,name,status){
            var content = "";
            if(status == '2'){
                content = '禁用';
            }
            if(status == '1'){
                content = '启用';
            }
            commonService.confirm($scope,'确认对话框','您确定要' + content + '【' + name +'】支付渠道吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.switch(id,status);
                }
            });
        };
        
        $scope.switch = function(id,status){
            console.log("id:",id);
            console.log("status",status);
            $http.put("/api/merchant/" + id,{"status":status}).success(function(response){
                if(response.success){
                    $scope.queryMerchant();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
            
        };

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

    }

})();