/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:52
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.components.new_merchant')
        .controller('EditMerchantCtrl', EditMerchantCtrl);

    /** @ngInject */
    function EditMerchantCtrl($stateParams,$http,$scope,toastr) {

        $scope.merchantId = $stateParams.merchant;

        $scope.merchant = {};

        $scope.loadMerchant = function() {
            console.log("merchant",$scope.merchantId);
            $http.get("/api/merchant/" + $scope.merchantId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.merchant = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadMerchant();

        $scope.saveMerchant = function () {
            console.log("update merchant:",$scope.merchant);
            $http.put("/api/merchant/" + $scope.merchantId,$scope.merchant).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };

    }

})();