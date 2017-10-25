/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:45
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.tool.redis')
        .controller('RedisListCtrl', RedisListCtrl);

    /** @ngInject */
    function RedisListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};

        $scope.data = {};

        $scope.names = [];
        $scope.getNames = function(){
            $http.get("/api/redis/data").success(function (resp) {
                if (resp.success) {
                    $scope.names = resp.data;
                    $scope.param.redis_name = $scope.names[0];
                    $scope.queryRedis();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });
        };
        $scope.getNames();
        

        $scope.queryRedis= function () {
            cfpLoadingBar.start();
            var url = "/api/redis?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&redis_name=" + ($scope.param.redis_name || "") +
                "&key=" + ($scope.param.key || "");
            $http.get(url).success(function (resp) {
                if (resp.success) {
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };
        $scope.queryBtn = function () {
            $scope.param.page = 1;
            $scope.queryRedis();
        };

        $scope.delete = function(key){
            commonService.confirm($scope,'确认对话框','您确定要删除【' + key +'】吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteRedis(key);
                }
            });
        };
        $scope.deleteRedis = function (key) {
            $http.delete("/api/redis/1?key=" + key).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryRedis();
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