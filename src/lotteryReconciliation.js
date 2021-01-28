angular
    .module('lotteryReconciliation')
    .config(LotteryReconciliationConfig);

function LotteryReconciliationConfig($stateProvider, $urlRouterProvider, gettext, rsSideMenuConfig) {

    $urlRouterProvider.when('/lotteryReconciliation', '/lotteryReconciliation/startpage');

    $stateProvider
        .state('lotteryReconciliation', {
            url: '/lotteryReconciliation',
            views: {
                'main': {
                    templateUrl: 'lotteryReconciliation.tpl.html',
                }
            },
            data: {
                pageTitle: gettext('Lottery Reconciliation'),
            }
        });
    
    rsSideMenuConfig.defineChildItem('lotterydata', 'lotteryReconciliation', {
        'title': gettext('Lottery Reconciliation'),
        //'activate': 'articles',
        'state': 'lotteryReconciliation.startpage',
        //'accessLevel': ['RS.ARTICLEAPPLICATION.CREATE'],
        //'accessLevel': ['RS.ITEM.ARTICLESEARCH.VIEW'],
        'accessLevel': ['RS.ARTICLEAPPLICATION.VIEW'],
        'order': 10
    });
}