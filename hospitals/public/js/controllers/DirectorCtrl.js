app.controller('DirectorController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {

    $scope.director = "This is director page";



    $scope.url = document.URL;
            // console.log($scope.url);

    $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);
            console.log($scope.id);

    // $location.hash($rootScope.em);
    // console.log($rootScope.em)
   
   // $scope.id = $location.$$hash;

    $http.get("/centres/" + $scope.id)
        .then(function(response) {
            $scope.centersData = response.data;
            console.log($scope.centersData);
            localStorage.setItem("someCentre", $scope.centersData);

            var someCentre = localStorage.getItem("someCentre");

        })
        .catch(function(response) {
           console.error('Gists error', response.status);
        })


            $('#exampleModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('whatever') // Extract info from data-* attributes
            var modal = $(this)
            modal.find('.modal-title').text('New message to ' + recipient)
            modal.find('.modal-body input').val(recipient)
})





    $scope.logOut = function () {
        localStorage.clear();
        var url = "http://" + $window.location.host + `/#!/centre`;
        console.log(url);
        $window.location.href = url;

        
    }

});


