app.controller('ExpertController', function ($scope, $http, $location, $log, $window, $rootScope) {

        $http.get('/find_centers')
        .then(function (result) {
            $scope.centres = result.data;
            console.log($scope.centres);
        })

    var formData
    $scope.addCenters = function () {
        console.log($scope.expert);
        console.log($scope.centre);

         formData = new FormData;
        for (var key in $scope.expert){
            formData.append(key,$scope.expert[key]);
        }

        for (var value in $scope.centre){
            console.log($scope.centre[value]);
            formData.append("centre", $scope.centre[value]);
        }


        var file=$("#centreImage")[0].files[0];
        formData.append("image",file);

        $http.post('/api/experts',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){

        });


        $scope.expert = {};
        $scope.centre = {};

    }


    // $scope.checkCenters = function () {
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