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
        .controller('UserListCtrl', UserListCtrl);

    /** @ngInject */
    function UserListCtrl($scope, $http, toastr) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryUser = function () {
            var url = "/api/user?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&email=" + ($scope.param.email || "") +
                "&user_name=" + ($scope.param.user_name || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                   // $scope.createBtn();
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
            $scope.queryUser();
        }

       /* $scope.page = function (p) {
            $scope.param.page = p;
            $scope.queryUser();
        };
*/
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

    /*    $scope.btns = [];
        $scope.createBtn = function(){
            $scope.btns = [];
            //var num = Math.ceil($scope.data.totalRow /  $scope.data.pageSize);
            var num = $scope.data.totalPage;
            console.log("num : " + num);
            for (var i = 0;i< num;i++) {
                $scope.btns.push(i);
            }
            console.log("btns : " + $scope.btns);
        };*/

        $scope.currentUser= {};
        $scope.getCookie = function(){
            var name = "MANGER-USER-KEY";
            var cookie_value =  $scope.readCookie(name);
            var end = cookie_value.indexOf("-")
            console.log("value : " + cookie_value);
            $scope.currentUser = cookie_value.substring(0,end);
            console.log("$scope.currentUser : " + $scope.currentUser);
        };

        $scope.readCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        $scope.getCookie();


    }

})();