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

    angular.module('BlurAdmin.pages.components.merchant')
        .controller('MerchantListCtrl', MerchantListCtrl);

    /** @ngInject */
    function MerchantListCtrl($scope, $http, toastr) {

        $scope.param = {"page":1};

        $scope.data = {};

        $scope.queryMerchant = function () {
            var url = "/api/merchant?page=" + ($scope.param.page || "") + "&merchant_no=" + ($scope.param.merchant_no || "") + "&merchant_name=" + ($scope.param.merchant_name || "")+ "&status=" + ($scope.param.status || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };

        $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryMerchant();
        };

        $scope.queryMerchant();

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
        
        $scope.switchStatus = function(id,status){
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

    }

})();