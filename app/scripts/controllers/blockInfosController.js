angular.module('ethExplorer')
    .controller('blockInfosCtrl', function ($rootScope, $scope, $location, $routeParams,$q) {

        $scope.init=function()
        {


            $scope.blockId=$routeParams.blockId;


            if($scope.blockId!==undefined) {

                getBlockInfos()
                    .then(function(result){
                        var number = web3.eth.blockNumber;

                    $scope.result = result;

                    if(result.hash!==undefined){
                        $scope.hash = result.hash;
                    }
                    else{
                        $scope.hash ='pending';
                    }
                    if(result.miner!==undefined){
                        $scope.miner = result.miner;
                    }
                    else{
                        $scope.miner ='pending';
                    }
                    $scope.gasLimit = result.gasLimit;
                    $scope.gasUsed = result.gasUsed;
                    $scope.nonce = result.nonce;
                    $scope.difficulty = ("" + result.difficulty).replace(/['"]+/g, '');
                    $scope.gasLimit = result.gasLimit; // that's a string
                    $scope.nonce = result.nonce;
                    $scope.number = result.number;
                    $scope.parentHash = result.parentHash;
                    $scope.blockNumber = result.number;
                    $scope.timestamp = result.timestamp;
                    $scope.extraData = result.extraData;
                    $scope.dataFromHex = hex2a(result.extraData);
                    $scope.size = result.size;
                    if($scope.blockNumber!==undefined){
                        $scope.conf = number - $scope.blockNumber + " Confirmations";
                        if($scope.conf===0 + " Confirmations"){
                            $scope.conf='Unconfirmed';
                        }
                    }
                    if($scope.blockNumber!==undefined){
                        var info = web3.eth.getBlock($scope.blockNumber);
                        if(info!==undefined){
                            var newDate = new Date();
                            newDate.setTime(info.timestamp*1000);
                            $scope.time = newDate.toUTCString();
                        }
                    }

                });

            }



            else{
                $location.path("/");
            }


            function getBlockInfos(){
                var deferred = $q.defer();

                web3.eth.getBlock   ($scope.blockId,function(error, result) {
                    if(!error){
                        deferred.resolve(result);
                    }
                    else{
                        deferred.reject(error);
                    }
                });
                return deferred.promise;

            }


        };
        $scope.init();

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
});