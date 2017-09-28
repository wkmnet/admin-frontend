
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.log.list')
        .controller('LogListCtrl', LogListCtrl);

    /** @ngInject */
    function LogListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 5;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};

        $scope.data = {};

        $scope.queryLog= function () {
            cfpLoadingBar.start();
            var url = "/api/log?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&module=" + ($scope.param.module || "") +
                "&event=" + ($scope.param.event || "") +
                "&before_text=" + ($scope.param.before_text || "") +
                "&after_text=" + ($scope.param.after_text || "") +
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

    }
})();