

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.tool.createOrder')
        .controller('CreateOrderCtrl', CreateOrderCtrl);

    /** @ngInject */
    function CreateOrderCtrl($scope, $http, toastr) {
        $scope.data = {};
        $scope.param = {};
        $scope.merchantList = {};
        $scope.platformList = {};

        $scope.queryMerchant = function () {
            var payType = "NATIVE";
            var url = "/api/merchant?pay_type=" + payType;
            $http.get(url).success(function (resp) {
                if (resp.data) {
                    $scope.merchantList = resp.data.list;
                    console.info("merchantList:{}", $scope.merchantList)
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });

        };
        $scope.queryMerchant();

        $scope.queryPlatForm = function () {
            var url = "/api/agency";
            $http.get(url).success(function (resp) {
                if (resp.data) {
                    $scope.platformList = resp.data.list;
                    console.info("platformList:{}", $scope.platformList)
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });

        };
        $scope.queryPlatForm();

        $scope.selectMerchant = function (index) {
            var merchant = $scope.merchantList[index];
            console.info("merchant:", merchant)
            $scope.param.channel = merchant.merchant_no;
            $scope.param.notify_url = merchant.notify_url;
            $scope.param.return_url = merchant.notify_url;
            $scope.param.app_id = merchant.app_id;
        };
        $scope.selectPlatform = function (index) {
            console.info("index:", index)
            var platform = $scope.platformList[index];
            console.info("platform:", platform)
            $scope.param.platform_no = platform.agency_no;
        };

        $scope.createOrder = function () {
            console.log("create order:", $scope.param);

            $http.post("/api/tool/create_order", $scope.param).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    $scope.data = response.data;
                    toastr.success('创建订单成功!');
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.checkOrder = function () {

            if (!$scope.param.amount || $scope.param.amount < 0) {
                toastr.error("金额不正确！");
                return;
            }
            if (!$scope.param.amount_pay || $scope.param.amount_pay < 0) {
                toastr.error("支付金额不正确！");
                return;
            }
            if (!$scope.param.out_trade_no) {
                toastr.error("订单号不正确！");
                return;
            }
            if (!$scope.param.channel) {
                toastr.error("渠道号不正确！");
                return;
            }
            if (!$scope.param.notify_url) {
                toastr.error("通知地址不正确！");
                return;
            }
            if (!$scope.param.return_url) {
                toastr.error("返回地址不正确！");
                return;
            }
            if (!$scope.param.platform_no) {
                toastr.error("平台号不正确！");
                return;
            }
            if (!$scope.param.subject) {
                toastr.error("主题不正确！");
                return;
            }
                if (!$scope.param.body) {
                    toastr.error("描述不正确！");
                    return;
                }
                if (!$scope.param.user_id) {
                    toastr.error("用户ID不正确！");
                    return;
                }

                $scope.createOrder();

        }
    }
})();