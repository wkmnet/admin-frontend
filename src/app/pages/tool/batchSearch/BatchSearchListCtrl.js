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

    angular.module('BlurAdmin.pages.tool.batchSearch')
        .controller('BatchSearchListCtrl', BatchSearchListCtrl);

    /** @ngInject */
    function BatchSearchListCtrl($scope, $http, toastr,cfpLoadingBar) {
        $scope.data = {};
        $scope.param = {};
        
        $scope.queryUserByIds= function () {
            cfpLoadingBar.start();
            $http.get("/api/tool/user/findByUserIds/"+$scope.param.userId).success(function (resp) {
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

        $scope.download= function () {
            cfpLoadingBar.start();
            $http.get("/api/tool/user/download_excel/"+$scope.param.userId).success(function (resp) {
                if (resp.success) {
                    $scope.fileUrl = resp.data;
                    window.location.href = $scope.fileUrl;
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