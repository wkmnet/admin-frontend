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

        $scope.queryAgency = function () {
            var url = "/api/agency?page=" + ($scope.param.page || "") + "&agency_no=" + ($scope.param.agency_no || "") + "&agency_name=" + ($scope.param.agency_name || "") + "&status=" + ($scope.param.status || "");
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
            $scope.queryAgency();
        };

        $scope.queryAgency();

        $scope.deleteAgency = function (id) {
            $http.delete("/api/agency/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryAgency();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

        $scope.switchStatus = function(id,status){
            console.log("id:",id);
            console.log("status",status);
            $http.put("/api/agency/" + id,{"status":status}).success(function(response){
                if(response.success){
                    $scope.queryAgency();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });

        };

        $scope.getAgencyNo = function(){
            $http.get("/api/agency/getAgencyNo").success(function(response){
                if(response.success){
                    $scope.agency.agency_no=response.data;
                }else{
                    toastr.error(response.message)
                }

            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
        };
    }

})();