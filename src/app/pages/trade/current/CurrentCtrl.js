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

    angular.module('BlurAdmin.pages.trade.current')
        .controller('CurrentCtrl', CurrentCtrl).controller("OrderModalCtrl",OrderModalCtrl);



    /** @ngInject */
    function CurrentCtrl($scope, $http, toastr,$uibModal) {
        
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};
        
        $scope.channel = {};

        $scope.queryTrade = function () {
            var url = "/api/trade?page=" + ($scope.param.page || "") +
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
                    //设置butten组
                  //  $scope.createBtn();

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
            $scope.queryTrade();
        }
      /*  $scope.page = function (p) {
            console.log("p:" + p);
            $scope.param.page = p;
            $scope.queryTrade();
        };*/
        
     /*   $scope.btns = [];
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
*/


        $scope.queryTrade();

       
        $( "#start" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            changeYear:true,
            dateFormat:"yy-mm-dd",
            onClose: function( selectedDate ) {
                $( "#end" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        $( "#end" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            changeYear:true,
            dateFormat:"yy-mm-dd",
            regional:"[zh-CN]",
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
  /*      $scope.sendMessge = function(order_no){
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
            console.log("order_no : " + order_no);
            var url = "/api/trade/refund?order_no=" + order_no + "&amount_pay=" + amount_pay;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success("申请退款成功！");
                    $scope.queryTrade();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
        
        $scope.order ={};
        $scope.queryTradeById = function(id){
            console.log("id: " + id);
            var url = "/api/trade/" + id;
            $http.get(url).success(function(resp){
                if(resp.success){
                   $scope.order = resp.data;
                    console.log("currentOrder : " + $scope.order.order_no)
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
            
        };

        $scope.open = function(id) {
            console.log("index :" + id);
           // $scope.queryTradeById(id);
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/trade/current/order_info.html",
                controller:"OrderModalCtrl",
                resolve: {
                    order:function(){
                        console.log("order :" + $scope.data.list[id].order_no);
                        return $scope.data.list[id];
                    }
                }
            });
        };



    }

    
    function OrderModalCtrl($scope, $http, toastr,$uibModal,order) {
        $scope.order = order;
        console.log("order_no : " + $scope.order.order_no);
        
    }


})();