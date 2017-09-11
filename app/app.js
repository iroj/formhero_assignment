/**
 * Created by ryankimber on 2017-09-07.
 */
var skillsLab = angular.module('skillsLab', ['app-templates', 'ngMaterial', 'ngRoute', 'ui.ace']);

skillsLab.run(function ($rootScope, $location) {

    $rootScope.$watch('selectedIndex', function (newValue, oldValue) {
        if (typeof newValue != 'undefined') {
            switch (newValue) {
                case 1:
                    $location.path('/demo');
                    break;
                default:
                    $location.path('/instructions');
            }
        }
    });

    $rootScope.$on('$routeChangeStart', function (event, next, prev) {
        switch (next.$$route.originalPath) {
            case '/instructions':
                $rootScope.selectedIndex = 0;
                break;
            case '/demo':
                $rootScope.selectedIndex = 1;
                break;
        }
    });
});

skillsLab.config(function ($routeProvider) {
    $routeProvider
        .when("/demo", {
            controller: function ($scope, $rootScope) {
                rootScope.selectedIndex = 1;
            }
        })
        .when("/instructions", {
            controller: function ($scope, $rootScope) {
                $rootScope.selectedIndex = 0;
            }
        })
        .otherwise({
            redirectTo: '/instructions'
        });

});
