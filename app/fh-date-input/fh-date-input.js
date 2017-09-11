angular.module('skillsLab')
    .directive('fhDateInput', function () {
        return {
            restrict: 'EAC', //E = element, A = attribute, C = class, M = comment  
            require: '?ngModel',
            scope: {
                ngModel: '=ngModel',
                endDate: '=fhMaxDate',
                startDate: '=fhMinDate',
                dateRequired: '=fhRequired',
                datePrecision: '=fhPrecision'
            },
            templateUrl: 'fh-date-input/fh-date-input.tpl.html',
            controller: function ($scope, $filter) {
                var parseDates = function (date) {
                    return {
                        day: parseInt($filter('date')(date, 'dd')) + 1,
                        month: parseInt($filter('date')(date, 'MM')) - 1,
                        year: parseInt($filter('date')(date, 'yyyy'))
                    }
                }
                $scope.$watch(function () {
                    return $scope.ngModel;
                }, function (newDate) {
                    if (newDate)
                        $scope.selectedDate = parseDates(newDate)
                });
                // $scope.$watch(function () {
                //     return $scope.selectedDate
                // }, function (date) {
                //     if ($scope.dateRequired) {

                //     }
                // })
                if ($scope.ngModel)
                    $scope.selectedDate = parseDates($scope.ngModel);
                else $scope.selectedDate = {
                    month: null,
                    day: null,
                    year: null
                };
                if ($scope.endDate) {
                    $scope.maxDate = parseDates($scope.endDate);
                }
                if ($scope.startDate)
                    $scope.minDate = parseDates($scope.startDate);

                $scope.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                $scope.select = {
                    days: function () {
                        var numberOfDays = new Date($scope.selectedDate.year, $scope.selectedDate.month + 1, 0).getDate() || 31;
                        var daysList = [];
                        for (var i = 1; i <= numberOfDays; i++) {

                            daysList.push(i);
                        }
                        return daysList;
                    },
                    months: function () {
                        return $scope.monthList;
                    },
                    years: function (selectedYear) {
                        var yearsList = [];
                        var decade;
                        if (selectedYear)
                            decade = Math.floor((selectedYear / 10)) * 10
                        else
                            decade = Math.floor(($filter('date')(new Date(), 'yyyy') / 10)) * 10
                        for (var i = 0; i < 10; i++) {
                            yearsList.push(decade);
                            decade++;
                        }
                        return yearsList;
                    }
                };
                $scope.getYearList = function (year) {
                    $scope.yearsList = $scope.select.years(year);
                }
                $scope.setMonth = function (month) {
                    $scope.selectedDate.month = month;
                    $scope.view = $scope.datePrecision=== 'month' ? 'year' : 'day';
                };
                $scope.setDay = function (day) {
                    $scope.selectedDate.day = day;
                    $scope.view = 'year';
                };
                $scope.setYear = function (year) {
                    $scope.selectedDate.year = year;
                    $scope.view = '';
                }
                $scope.changeView = function (view) {
                    $scope.view = view
                }
            },

            link: function (scope, elem, attr, ctrl, ngModel) {}
        };
    });