app.controller('CentreController', function ($scope, $http, $location, $log, $window, $rootScope) {
    var formData
    $scope.addCenters = function () {
      
         formData = new FormData;
        for (var key in $scope.centre){
            formData.append(key,$scope.centre[key]);
        }

        var file=$("#centreImage")[0].files[0];
        formData.append("image",file);

        $http.post('/api/centres',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
                $scope.errors = res.data;
                
            });

        $scope.centre = {};

    }


    $scope.changePassword = function() {

       var url = "/checkEmail";
       var data = {
           email: $scope.changePass
       }

       $scope.e;


       if ($scope.changePass === undefined) {
           document.getElementById('checkE').style.borderColor = "red";
           document.getElementById('findEmail').style.color = "red";
           document.getElementById('findEmail').style.fontSize = "xx-large";
       }  else {
           $http.post(url, data)
               .then(function(httpRequest) {

                   if (httpRequest.data.success == true)  {
                       document.getElementById('findEmail').innerHTML = "Please enter your email or phone number.";
                       document.getElementById('findEmail').style.color = "black";
                       $scope.fEmail = true;
                       $scope.newPassword = true;
                       $scope.sendEOrP = true;
                       $scope.sendNewPass = true;
                       $scope.e = $scope.changePass;

                       $scope.sendP = function() {
                           console.log($scope.newPass);


                           var res = {
                               newPass : $scope.newPass,
                               e : $scope.e
                           }
                           $http.post("/newPassword", res)
                               .then(function(result) {

                                   document.getElementById('forPass').innerHTML = result.data.message;
                                   document.getElementById('forPass').style.fontSize = "xx-large";
                                   $scope.newPass = "";

                                   if(result.data.success == false) {
                                       document.getElementById('forPass').style.color = "red";
                                   }
                               });

                       }



                   } else {
                       document.getElementById('findEmail').innerHTML = httpRequest.data.message;
                       document.getElementById('findEmail').style.color = "red";
                   }
               });

       }




   }


    $scope.checkCentres = function () {
       
        var url = "/clinic"
        var data = $scope.check;

        $http.post(url, data)
            .then(function(httpRequest) {

                $scope.centres = httpRequest.data;

                 if($scope.centres.success == true){
                    $scope.href = $scope.centres.href
                    var url = "http://" + $window.location.host + `#!director/?${$scope.href}`;
                    
                    $window.location.href = url;

                 } else {

                    $location.path('/centre');
                    $scope.fullInnput = true;
                 }
            

            });

    }

});