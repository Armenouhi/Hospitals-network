app.controller('InfoController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {

    $scope.director = "This is director page";



    $scope.url = document.URL;
            // console.log($scope.url);

    $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);
            console.log($scope.id);

    $rootScope.em = $scope.id;

    $http.get("/centres/" + $scope.id)
        .then(function(response) {
            $scope.centersData = response.data;
            // console.log($scope.centersData);
            localStorage.setItem("someCentre", $scope.centersData);

            var someCentre = localStorage.getItem("someCentre");

                var name = $scope.centersData.centreName;
                // console.log(name);

                    var count = [];
                    $http.get("/find_experts")
                        .then(function(response) {
                            // console.log(response.data);
                            var dataExperts = response.data;

                            for (var j in  dataExperts) {
                                 // console.log(response.data[j].centre);

                                if ($scope.id == dataExperts[j].centre) {
                                    // console.log(response.data[j].centre);
                                    var expert = dataExperts[j].firstname;
                                    console.log(expert);
                                    count.push(expert);

                                } else {
                                    // console.log('response.data[j].centre');
                                }


                                  var arr = [];
             $http.get("/find_patients")
                        .then(function(response) {
                             console.log(response.data);

                            for (var t in  response.data) {
                                 // console.log(response.data[j].centre[0]);

                                if (response.data[t].expert == dataExperts[0]._id) {
                                    // console.log(response.data[j].centre);
                                    var patients = response.data[t].fullname;
                                    console.log(patients);
                                    arr.push(patients);

                                } else {
                                    // console.log('response.data[j].centre');
                                }

                            }

                                console.log(arr.length);


                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `${name}'s rating`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b style='color: red'>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: [

                                { y: count.length, label: "Experts"},
                                { y: arr.length, label: "Patients"},
                                { y:(count.length + arr.length), label: "General"},
                        ]
                    }]
                });

                chart.render();
                    })
                        .catch(function(response) {
                        console.error('Gists error', response.status);
                    })

                            }

                                console.log(count.length);

              

                
                    })
                        .catch(function(response) {
                        console.error('Gists error', response.status);
                    })

         

        })
        .catch(function(response) {
           console.error('Gists error', response.status);
        })




});


