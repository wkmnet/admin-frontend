
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.log.list')
        .controller('LogListCtrl', LogListCtrl);

    /** @ngInject */
    function LogListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};

        $scope.data = {};

        $scope.queryLog= function () {
            cfpLoadingBar.start();
            var url = "/api/log?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&module=" + ($scope.param.module || "") +
                "&event=" + ($scope.param.event || "") +
                "&text=" + ($scope.param.text || "") +
                "&email=" + ($scope.param.email || "");
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
            $scope.queryLog();
        }

        $scope.queryLog();

        $scope.strToJson = function (str){
            var str = JSON.stringify(JSON.parse(str), undefined, 4);
            console.log("str ", str);
            return str;
        }
        
        $scope.modules = {};
        $scope.getModules = function(){
            $http.get("/api/log/getModules").success(function(response){
                if(response.success){
                    $scope.modules=response.data;
                }else{
                    toastr.error(response.message)
                }

            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
        };
        $scope.getModules();
        $scope.events = {};
        $scope.getEvents = function(){
            $http.get("/api/log/getEvents").success(function(response){
                if(response.success){
                    $scope.events=response.data;
                }else{
                    toastr.error(response.message)
                }

            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
        };
        $scope.getEvents();

    }
})();