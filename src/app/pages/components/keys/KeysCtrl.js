/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:21
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.components.keys')
        .controller('KeysCtrl', KeysCtrl);

    /** @ngInject */
    function KeysCtrl($scope, $http, toastr) {

        $scope.merchant = {};

        $scope.data = {};
        
        $scope.md5 = {};

        $scope.wxSignType = ["MD5"];

        $scope.alipaySignType = ["RSA2"];

        $scope.signType = {};

        $scope.queryMerchant = function () {
            var url = "/api/merchant";
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
        $scope.queryMerchant();
        
        
        $scope.selectMerchantChange = function(merchantId){
            console.log("merchantId ", merchantId);
            //查询签名类型和密钥
            $http.get("/api/merchant/" + merchantId).success(function(response){
                console.log("response:",response);
                if(response.success && response.data) {

                  $scope.merchant.sign_type = response.data.sign_type;

                    $scope.merchant.pay_channel = response.data.pay_channel;
                    //如果有是微信，就显示md5
                    if($scope.merchant.pay_channel == "wx"){
                        console.log("wx")
                        $scope.signType = $scope.wxSignType;

                    }
                    //如果是支付宝，就显示rsa2
                    if($scope.merchant.pay_channel == "alipay"){
                        console.log("alipay")
                        $scope.signType = $scope.alipaySignType;
                    }
                    console.log("signType:",$scope.signType);
                    //有签名类型就去数据库查找
                    if ($scope.merchant.sign_type) {
                        $scope.showKey();
                    }else{
                        $("#deleteBtn").hide();
                        $scope.merchant.sign="";
                        $scope.merchant.public_sign="";
                        $scope.merchant.private_sign="";
                        $scope.merchant.signId = "";
                    }
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });

         
        }
        
        $scope.showKey = function(){
                //查询签名类型和密钥
            console.log("merchant.sign_type:", $scope.merchant.sign_type);
            $scope.merchant.merchant_id = $scope.merchant.id;
                $http.get("/api/sign/" + $scope.merchant.id + "?sign_type=" + $scope.merchant.sign_type).success(function (res) {
                    console.log("res:", res);
                    
                    if (res.success && res.data) {
                        $scope.merchant.sign=res.data.sign;
                        $scope.merchant.public_sign=res.data.public_sign;
                        $scope.merchant.private_sign=res.data.private_sign;
                        $scope.merchant.signId = res.data.id;
                        //如果成功，可以删除
                        $("#deleteBtn").show();
                        if($scope.merchant.sign_type == "MD5"){
                            $("#publicSignDiv").hide();
                            $("#privateSignDiv").hide();
                            $("#mdgSignDiv").show();
                        }else if($scope.merchant.sign_type == "RSA2"){
                            $("#mdgSignDiv").hide();
                            $("#publicSignDiv").show();
                            $("#privateSignDiv").show();
                        }
                    
                    } else {
                        $scope.merchant.sign="";
                        $scope.merchant.public_sign="";
                        $scope.merchant.private_sign="";
                        $scope.merchant.signId = "";
                     
                        $("#deleteBtn").hide();
                        toastr.error(res.message);
                    }
                   
                }).error(function (data, status) {
                    console.log("status:", status);
                    toastr.error(data);
                });
            
            
        }
        
        $scope.selectSignTypeChange = function(sign_type){
            console.log("sign_type : " + sign_type);
            if(sign_type == "MD5"){
                $("#publicSignDiv").hide();
                $("#privateSignDiv").hide();
                $("#mdgSignDiv").show();
            }else if(sign_type == "RSA2"){
                $("#mdgSignDiv").hide();
                $("#publicSignDiv").show();
                $("#privateSignDiv").show();
            }
            $scope.showKey();
        }

        $scope.saveSign = function(){
            console.log("save sign:",$scope.merchant);
            if($scope.merchant.signId){
                $http.put("/api/sign/" + $scope.merchant.signId,$scope.merchant).success(function(response){
                    console.log("response:",response);
                    if(response.success){
                        toastr.success('数据更新成功!');
                      //  $("#deleteBtn").hide();
                       // $scope.merchant={};
                        console.log("merchant:",$scope.merchant);
                        console.log("merchant.signId:",$scope.merchant.signId);
                    } else {
                        toastr.error(response.message);
                    }
                }).error(function(data, status){
                    console.log("status:",status);
                    toastr.error(data);
                });

            }else{

                $http.post("/api/sign",$scope.merchant).success(function(response){
                    console.log("response:",response);
                    if(response.success){
                        toastr.success('数据保存成功!');
                        $scope.merchant={};
                        $("#deleteBtn").hide();
                    } else {
                        toastr.error(response.message);
                    }
                }).error(function(data, status){
                    console.log("status:",status);
                    toastr.error(data);
                });

            }


        }

        $scope.deleteSign = function(){
            console.log("id:",$scope.merchant.signId);
            console.log("sign_type:",$scope.merchant.sign_type);
            
            $http.delete("/api/sign/" + $scope.merchant.signId + "?sign_type=" + $scope.merchant.sign_type).success(function(res){
                console.log("res:",res);
                if(res.success){
                    toastr.success('数据删除成功!');
                    $("#deleteBtn").hide();
                    $scope.merchant={};
                } else {
                    toastr.error(res.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        }


    }

})();