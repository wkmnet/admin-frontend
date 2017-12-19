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

    angular.module('BlurAdmin.pages.tool.queryUser')
        .controller('QueryUserListCtrl', QueryUserListCtrl);

    /** @ngInject */
    function QueryUserListCtrl($scope, $http, toastr,cfpLoadingBar) {
        $scope.data = {};
        $scope.param = {};
        
        $scope.queryUserByPhone= function () {
            cfpLoadingBar.start();
            $http.get("/api/tool/user/findByPhone/"+$scope.param.phone).success(function (resp) {
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
        $scope.queryUserById= function () {
            cfpLoadingBar.start();
            $http.get("/api/tool/user/findByUserId/"+$scope.param.userId).success(function (resp) {
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

    }
})();