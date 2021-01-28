angular
    .module('lotteryReconciliation')
    .factory('httpErrorInterceptor', ['lotteryReconciliationEnv', '$q', '$injector', function (lotteryReconciliationEnv, $q, $injector) {
        console.log("Registering interceptor of LotteryReconciliation");
        console.log("Registering interceptor with settings.", lotteryReconciliationEnv)

        function isLotteryReconciliationRequest(config) {
            return config.url.includes(lotteryReconciliationEnv.baseUrl);
        };

        function isLotteryReconciliationErrorResponse(reason) {
            return reason.config.url.includes(lotteryReconciliationEnv.baseUrl);
        };

        return {
            'request': config => {
                if (isLotteryReconciliationRequest(config)) {
                    console.log("Got request", config);
                }
                return config;
            },
            'responseError': reason => {
                console.error("Rejected request with reason: ", reason);
                if (isLotteryReconciliationErrorResponse(reason) && (reason.status === 401 || reason.status === 403)) {
                    $injector.get('$state').go('home');
                }

                return $q.reject(reason);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpErrorInterceptor');
    }]);