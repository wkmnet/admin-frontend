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

    angular.module('BlurAdmin.pages.user.new')
        .controller('EditUserCtrl', EditUserCtrl);

    /** @ngInject */
    function EditUserCtrl($stateParams,$http,$scope,toastr) {

        $scope.userId = $stateParams.user;
        console.log("userId",$stateParams.user);

        $scope.user = {};

        $scope.loadUser = function() {
            console.log("user",$scope.userId);
            $http.get("/api/user/" + $scope.userId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.user = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadUser();

        $scope.saveUser = function () {
            console.log("update user:",$scope.user);
            $http.put("/api/user/" + $scope.userId,$scope.user).success(function(response){
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

    }

})();