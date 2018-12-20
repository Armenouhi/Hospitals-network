app.controller('DirectorController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {

    $scope.director = "This is director page";

    $scope.url = document.URL;

    $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);

   
    $http.get("/centres/" + $scope.id)
        .then(function(response) {
            $scope.data = response.data;

        })



        	//	Image 
    $scope.changeImg = document.getElementById("changeImg");

   $scope.changeImg.addEventListener("mouseover", function( event ) {   
    document.getElementById("image").style.display = "block";
    
    setTimeout(function() {
     document.getElementById("image").style.display = "none";
    }, 5000);
  }, false);
	


   			//	Post image
	var formData;

   	$scope.changeImg = function() {
   		 formData = new FormData;    
        var file=$("#image")[0].files[0];
        
        formData.append("image",file);
        formData.append("id",$scope.id);


        $http.post('/changeImg',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
                $scope.errors = res.data;

                console.log($scope.errors);
            });


   	}



    $scope.logOut = function () {
        localStorage.clear();
        var url = "http://" + $window.location.host + `/#!/centre`;
        $window.location.href = url;

        
    }

});


