angular
    .module('lotteryReconciliation.startpage')
    .config(LotteryReconciliationStartpageConfig);

// @ngAnnotate
function LotteryReconciliationStartpageConfig($stateProvider) {

    $stateProvider
        .state('lotteryReconciliation.startpage', {
            url: '/startpage',
            templateUrl: 'startpage/startpage.html',
            controller: 'StartpageController as vm'
        })
    ;
}