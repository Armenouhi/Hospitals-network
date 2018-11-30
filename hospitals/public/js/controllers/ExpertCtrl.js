app.controller('ApplicationController', function ($scope,
                                                  USER_ROLES,
                                                  AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };
})
// app.config(function ($stateProvider, USER_ROLES) {
//     $stateProvider.state('patient', {
//         url: '/patient',
//         templateUrl: 'expert',
//         data: {
//             authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
//         }
//     });
// })


// app.config(function ($httpProvider) {
//     $httpProvider.interceptors.push([
//         '$injector',
//         function ($injector) {
//             return $injector.get('AuthInterceptor');
//         }
//     ]);
// })
    app.factory('AuthInterceptor', function ($rootScope, $q,
                                          AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

app.directive('loginDialog', function (AUTH_EVENTS) {
    return {
        restrict: 'A',
        template: '<div ng-if="visible" ng-include="patient.html">',
        link: function (scope) {
            var showDialog = function () {
                scope.visible = true;
            };

            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
        }
    };
})