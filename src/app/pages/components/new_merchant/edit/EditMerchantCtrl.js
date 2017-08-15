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

        $scope.payMethod= {};

        $scope.wxPayType = [{"key":"NATIVE","value":"二维码支付"},{"key":"JSAPI","value":"H5页面支付"}];

        $scope.alipayPayType = [{"key":"NATIVE","value":"二维码支付"},{"key":"QUICK_WAP_PAY","value":"手机网站支付"},{"key":"FAST_INSTANT_TRADE_PAY","value":"PC网站支付"}];

        $scope.loadMerchant = function() {
            console.log("merchant",$scope.merchantId);
            $http.get("/api/merchant/" + $scope.merchantId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.merchant = response.data;

                    console.log("pay_channel",$scope.merchant.pay_channel);
                    
                    if($scope.merchant.pay_channel == "wx"){
                        console.log("wx")
                        $scope.payMethod = $scope.wxPayType;
                    }
                    if($scope.merchant.pay_channel == "alipay"){
                        console.log("alipay")
                        $scope.payMethod = $scope.alipayPayType;
                    }

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


        $scope.selectAppChange = function(selected){
            console.log("selected pay app :",selected)
            if(selected == "wx"){
                console.log("wx")
                $scope.payMethod = $scope.wxPayType;
                return;
            }
            if(selected == "alipay"){
                console.log("alipay")
                $scope.payMethod = $scope.alipayPayType;
                return;
            }
        };

    }

})();