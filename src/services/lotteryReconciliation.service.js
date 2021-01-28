(function () {
    angular
        .module('lotteryReconciliation')
        .factory('lotteryReconciliationService', LotteryReconciliationService);

    function LotteryReconciliationService($http, lotteryReconciliationEnv) {

        const endpoint = `${lotteryReconciliationEnv.baseUrl}`;

        return {
            "submitData": submitData,
            "getSubmittedData": getSubmittedData,
            "getDataPerDay": getDataPerDay,
        };

        //Submit LotteryReconciliation 
        function submitData(request) {
            return $http.post(`${endpoint}SubmitData`, request)
                .then(response => {
                    console.log("Submit Data: ", response);
                    return response.data;
                });
        }

        function getDataPerDay(period) {
            return $http.get(`${endpoint}GetDataPerDay`, {
                params: {
                    period: period || new Date()
                }
            }).then(response => {
                return response.data;
            });
        }

        function getSubmittedData(from, to) {
            return $http.get(endpoint, {
                params: {
                    from: from || new Date(),
                    to: to || new Date()
                }
            }).then(response => {
                return response.data;
            });
        }
    }
})();