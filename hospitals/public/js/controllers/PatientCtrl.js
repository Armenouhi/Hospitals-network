app.controller('PatientController', function ($scope, $http, $location, $log, $window, $rootScope) {
    $http.get('/find_experts')
        .then(function (result) {
            $scope.experts = result.data;
            console.log($scope.experts);
        })

    var formData
    $scope.addCenters = function () {
        console.log($scope.patient);
        //console.log($scope.expert);

         formData = new FormData;
        for (var key in $scope.patient){
            formData.append(key,$scope.patient[key]);
        }

        // for (var value in $scope.expert){
        //     console.log($scope.expert[value]);
        //     formData.append("expert", $scope.expert[value]);
        // }

        var file=$("#centreImage")[0].files[0];
        formData.append("image",file);

        $http.post('/api/patients',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){

         });

        $scope.patient = {};
    //     $scope.expert = {};

     }


    // $scope.checkPatients = function () {
    //     console.log($scope.check);
    //     console.log($location.$$path);
    //     var url = "/clinic"
    //     var data = $scope.check;

    //     $http.post(url, data)
    //         .then(function(httpRequest) {

    //             $scope.checkData = httpRequest.data;
    //             console.log($scope.checkData);
    //             console.log($scope.checkData.message);
    //             $rootScope.em = $scope.checkData.href;

    //         });

    // }

});