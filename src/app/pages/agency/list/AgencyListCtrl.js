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

    angular.module('BlurAdmin.pages.user.list')
        .controller('AgencyListCtrl', AgencyListCtrl);

    /** @ngInject */
    function AgencyListCtrl($scope, $http, toastr) {
        $scope.param = {"page":1};

        $scope.data = {};

        $scope.queryUser = function () {
            var url = "/api/user?page=" + ($scope.param.page || "") + "&email=" + ($scope.param.email || "") + "&user_name=" + ($scope.param.user_name || "");
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
            $scope.queryUser();
        };

        $scope.queryUser();

        $scope.deleteUser = function (id) {
            $http.delete("/api/user/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryUser();
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