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
        $scope.param={};

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
            $scope.user.password = $scope.param.password;
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

        $scope.checkUser = function(){
            var regEmail = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z])+$/;
            var regPwd =/^[a-z0-9_]{6,18}$/;

            if(!$scope.user.email || !regEmail.test($scope.user.email)){
                toastr.error("邮箱格式不正确！");
                return;
            }
            $scope.saveUser();

        };



    }

})();