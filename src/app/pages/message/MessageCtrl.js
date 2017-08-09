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

    angular.module('BlurAdmin.pages.message')
        .controller('MessageCtrl', MessageCtrl);

    /** @ngInject */
    function MessageCtrl($scope, $http, toastr) {
        
        $scope.tablePageSize = 10;
        $scope.param = {"page_size":$scope.tablePageSize};

        $scope.data = {};
        
        $scope.channel = {};

        $scope.queryMessage = function () {
            var url = "/api/message?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&status=" + ($scope.param.status || "");

            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                    //设置butten组
                    $scope.createBtn();

                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
        $scope.page = function (p) {
            console.log("p:" + p);
            $scope.param.page = p;
            $scope.queryMessage();
        };
        
        $scope.btns = [];
        $scope.createBtn = function(){
            $scope.btns = [];
           // var num = Math.ceil($scope.data.totalRow /  $scope.data.pageSize);
            var num = $scope.data.totalPage;
            console.log("num : " + num);
            for (var i = 0;i< num;i++) {
                $scope.btns.push(i);
            }
            console.log("btns : " + $scope.btns);
        };



        $scope.queryMessage();
        
        //发送通知
        $scope.sendMessge = function(id){
            console.log("id : " + id);
            var url = "/api/message/sendMessage?id=" + id;
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

        };




       

    }

})();