angular
    .module('lotteryReconciliation.startpage')
    .controller('StartpageController', StartpageController);

function StartpageController($scope, auth, lotteryReconciliationService) {

    let vm = this;

    $scope.isManager = true;//auth.checkUserRoles(["RS.ARTICLEAPPLICATION.CREATE"]);


    vm.from = '';
    vm.to = '';

    vm.searchLotteries = searchLotteries;

    vm.logicalDates = logicalDates;
    vm.logicalDatesBool = true;

    vm.lotteries = '';


    init();

    function init() {

    }

    // Prevent datepicker opening on Enter-key from other inputs in form:
    $scope.keyPress = e => {
        if (e.charCode == 13) {
            e.stopPropagation();
            e.preventDefault();
            e.bubbles = false;
            return false;
        }
    }
    
    // Search *******************************
    function searchLotteries() {

        console.log("beggining search")
        lotteryReconciliationService.getSubmittedData(vm.from, vm.to)
            .then(data => {
                vm.lotteries = data;
                console.log("received search data:", data);
            }).catch(reason => {
                console.error(reason);
            });
    }


    // Calendars *********************
    vm.open = open;

    $scope.open1 = $event => {
        $event.stopPropagation();

        $scope.opened1 = true;
    };

    $scope.open2 = $event => {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;

    };
    $scope.dateOptions = {
        'starting-day': 1,
        'today-highlight': true,
    };

    // Prevent selection of future date:
    let t = new Date();
    t.setDate(t.getDate());
    $scope.maxDate = new Date(t.getFullYear(), t.getMonth(), t.getDate());

    $scope.format = 'dd/MM/yyyy';
    $scope.defaultDate = new Date();

    // check from date before to date, & deal with ui-datepicker returning null on clear
    function logicalDates(from, to) {
        if (vm.to === null || vm.to === undefined || vm.to == NaN) {
            vm.logicalDatesBool = true;
        } else {
            if (new Date(vm.from) > new Date(vm.to)) {
                vm.logicalDatesBool = false;
            } else {
                vm.logicalDatesBool = true;
            }
        }
    }
}
