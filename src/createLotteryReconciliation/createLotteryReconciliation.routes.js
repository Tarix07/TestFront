angular
    .module('lotteryReconciliation.createLotteryReconciliation')
    .config(CreateLotteryReconciliationConfig);

function CreateLotteryReconciliationConfig($stateProvider, gettext) {
    $stateProvider
        .state('lotteryReconciliation.createLotteryReconciliation', {
            url: '/createLotteryReconciliation',
            abstract: true,
            template: '<ui-view />'
        })
        .state('lotteryReconciliation.createLotteryReconciliation.create', {
            url: '/:period',
            templateUrl: 'createLotteryReconciliation/createLotteryReconciliation.html',
            controller: 'CreateLotteryReconciliationController as vm',
            data: {
                pageTitle: gettext('New Lottery Reconciliation')
            }
        });
}