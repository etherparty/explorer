angular.module('ethExplorer')
    .controller('mainCtrl', function ($rootScope, $scope, $location) {

        $scope.blockNum = web3.eth.blockNumber;

        $scope.processRequest= function(){
             var requestStr = $scope.ethRequest.split('0x').join('');

            if(requestStr.length === 40)
              return goToAddrInfos(requestStr)
            else if(requestStr.length === 64){
              if(/[0-9a-zA-Z]{64}?/.test(requestStr))
                return goToTxInfos(requestStr)
              else if(/[0-9]{1,7}?/.test(requestStr))
                return goToBlockInfos(requestStr)
            }else if(parseInt(requestStr) > 0)
              return goToBlockInfos(parseInt(requestStr))

            alert('Don\'t know how to handle '+ requestStr)
        };


        function goToBlockInfos(requestStr){
            $location.path('/block/'+requestStr);
        }

        function goToAddrInfos(requestStr){
            $location.path('/address/'+requestStr);
        }

         function goToTxInfos (requestStr){
             $location.path('/transaction/'+requestStr);
        }

    });
