app.controller('CentresController', function ($scope, $http, $location) {
    $http.get("/find_centers")
        .then(function(response) {
            $scope.cs = response.data;

             $scope.carOnPage = 2;
            $scope.startFrom = 0;
            $scope.CountPageDivs = [];
            for(var i=1; i <= Math.round($scope.cs.length/2); i++) {
                $scope.CountPageDivs.push(i);
            }
            $scope.PaginationFunction = function(event){
                $scope.turId = event.target.id;
                $scope.startFrom= ($scope.turId-1)*$scope.carOnPage;
            };


            
        })
});