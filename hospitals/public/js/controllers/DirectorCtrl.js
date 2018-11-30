app.controller('DirectorController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {

    $scope.director = "This is director page";

    $location.hash($rootScope.em);
   console.log($location);
   console.log($location.$$hash);
   $scope.id = $location.$$hash;

    $http.get("/find_centers")
        .then(function(response) {
            $scope.centersData = response.data;
            console.log(response);
        });

    $scope.logOut = function () {
        // var url = "http://" + $window.location.host + `/#!/centre`;
        // $log.log(url);
        // $window.location.href = url;


        var data  = {};

        $http.post("/logout", data)
            .then(function(httpRequest) {
                console.log(httpRequest);
            });
    }

});


