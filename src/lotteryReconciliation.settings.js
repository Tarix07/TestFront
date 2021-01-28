angular
    .module('lotteryReconciliation')
    .factory('lotteryReconciliationEnv', lotteryReconciliationEnv);

function lotteryReconciliationEnv() {
    // http://ngvrsweba01u/RS.LocalArticleApplication.API/api/
    const baseUrl = 'http://localhost:53467/api/';
    return {
        baseUrl: baseUrl,
    }
}