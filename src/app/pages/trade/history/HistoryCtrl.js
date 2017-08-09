/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:31
 * ---------------------------------
 *
 */
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.trade')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($scope, $http, toastr) {
        $scope.param = {"page":1,"page_size":20};

        $scope.data = {};
        
        $scope.channel = {};

        $scope.queryHistoryTrade = function () {
            var url = "/api/trade/history?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&order_no=" + ($scope.param.order_no || "") +
                "&out_pay_order=" + ($scope.param.out_pay_order || "") +
                "&channel=" + ($scope.param.channel || "") +
                "&status=" + ($scope.param.status || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "");

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
            $scope.queryHistoryTrade();
        };

        $scope.queryHistoryTrade();

       
        $( "#start" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            language:"zh-CN",
            dateFormat:"yy-mm-dd",
            onClose: function( selectedDate ) {
                $( "#end" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        $( "#end" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            language:"zh-CN",
            dateFormat:"yy-mm-dd",
            onClose: function( selectedDate ) {
                $( "#start" ).datepicker( "option", "maxDate", selectedDate );
            }
        });
        
        //查询渠道
        $scope.selectChannel = function () {
            var url = "/api/merchant";
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

        //发送通知
       /* $scope.sendMessge = function(order_no){
            console.log("order_no : " + order_no);
            var url = "/api/trade/sendMessage?order_no=" + order_no;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("发送通知成功！");
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };*/

        //发送通知
        $scope.refund = function(order_no,amount_pay){
            console.log("order_no : " + order_no);
            var url = "/api/trade/refund?order_no=" + order_no + "&amount_pay=" + amount_pay;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("申请退款成功！");
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };

        $scope.btns = [];
        $scope.createBtn = function(){
            $scope.btns = [];
            //var num = Math.ceil($scope.data.totalRow /  $scope.data.pageSize);
            var num = $scope.data.totalPage;
            console.log("num : " + num);
            for (var i = 0;i< num;i++) {
                $scope.btns.push(i);
            }
            console.log("btns : " + $scope.btns);
        };



    }

})();