angular
    .module('lotteryReconciliation.createLotteryReconciliation')
    .controller('CreateLotteryReconciliationController', CreatelotteryReconciliationController);

function CreatelotteryReconciliationController(auth, 
    lotteryReconciliationService, 
    rsNotify,
    gettextCatalog,
    rsDialogs,
    $scope) {

    let vm = this;

    $scope.isManager = true; //auth.checkUserRoles(["RS.ARTICLEAPPLICATION.CREATE"]);

    vm.lottery = {
        onlineSales: undefined,
        onlinePrizes: undefined,
        cardPrizes: undefined,
        stockVariance: undefined
    };

    vm.period = '';

    vm.searchLotteryPerDay = searchLotteryPerDay;
    vm.confirmSendLottery = confirmSendLottery;

    vm.status = false;
    vm.lotteryWithStatus= '';

    vm.validateAmount = (formInputName, inputValueName) => {
        let validity = true;
        if (Number.isNaN(vm.lottery[inputValueName]) || !vm.lottery[inputValueName]) {
            validity = false;
        }
        $scope.lotteryReconciliationForm[formInputName].$setValidity("required", validity);
    };


    init();

    function init() {

    }


    // Search *******************************
    function searchLotteryPerDay() {

        console.log("beggining search")
        lotteryReconciliationService.getDataPerDay(vm.period)
            .then(data => {
                vm.lotteryWithStatus = data.lottery;
                vm.lotteryWithStatus.status = data.IsFinalVersion == 'true';
                console.log("received search data:", data);
            }).catch(reason => {
                console.error(reason);
            });
    }


    function confirmSendLottery() {

        if (!$scope.lotteryReconciliationForm.$valid) {
            console.error("Form is invalid");
            return;
        }
        console.log("Showing confirmation window");
        rsDialogs.confirm(
            '',
            gettextCatalog.getString('You spend your attempt to send LotteryReconcilation.<br> Are you sure you want to send it?'),
            sendLottery,
            angular.noop,
            {
                labels: {
                    ok: gettextCatalog.getString('Yes'), cancel: gettextCatalog.getString('No')
                }
            });
    }

    function sendLottery() {
            
        let request = vm.application;
            console.log("Calling submit data");
            lotteryReconciliationService.submitData(request)         
        .then(response => {
            vm.status = response.IsFinalVersion == 'true';           
            
            if(sm.status){
                rsNotify.success('Lottary Reconciliation successfully sent');
            }
            else{
                rsNotify.success(gettextCatalog.getString('Lottery Reconciliation sent with some errors<br> You can change values and send again?'));
                formReset();
            }      
            return Promise.resolve();
        }).catch(reason => {
            console.error(reason);
            rsNotify.error(gettextCatalog.getString('Failed to save Lottery Reconcilation'));
            return Promise.reject(reason);
        });
    }

    function formReset(){
        vm.lottery.onlinePrizes ='';
        vm.lottery.onlineSales = '';
        vm.lottery.cardPrizes ='';
        vm.lottery.stockVariance = '';
        vm.status = '';
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

    // Calendar
    vm.open = open;

    $scope.open1 = $event => {
        $event.stopPropagation();

        $scope.opened1 = true;
    };

    $scope.dateOptions = {
        'starting-day': 1,
        'today-highlight': true,
    };

    // Prevent selection of future date:
    let t = new Date();
    t.setDate(t.getDate());
    let t2 = new Date();
    t2.setDate(t2.getDate()-7);
    $scope.maxDate = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    $scope.minDate = new Date(t2.getFullYear(), t2.getMonth(), t2.getDate());

    $scope.format = 'dd/MM/yyyy';
    $scope.defaultDate = new Date();

}