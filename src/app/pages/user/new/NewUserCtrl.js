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

    angular.module('BlurAdmin.pages.user.new')
        .controller('NewUserCtrl', NewUserCtrl);

    /** @ngInject */
    function NewUserCtrl($scope, $http, toastr) {

        $scope.user = {};

        $scope.saveUser = function () {
            console.log("save user:",$scope.user);

            $http.post("/api/user",$scope.user).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                    $scope.user = {};
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