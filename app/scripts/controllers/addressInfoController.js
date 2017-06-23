angular.module('ethExplorer')
    .controller('addressInfoCtrl', function ($rootScope, $scope, $location, $routeParams, $q) {

      var web3 = $rootScope.web3;
      var abiDecoder = $rootScope.abiDecoder;

      $scope.init=function(){

        $scope.addressId=$routeParams.addressId;

        if($scope.addressId!==undefined) {
          getAddressInfos().then(function(result){
            $scope.balance = result.balance;
            $scope.balanceInEther = result.balanceInEther;
          });
        }


        function getAddressInfos(){
          var deferred = $q.defer();

          web3.eth.getBalance($scope.addressId,function(error, result) {
            if(!error) {
                deferred.resolve({
                  balance: result,
                  balanceInEther: web3.fromWei(result, 'ether')
                });
            } else {
                deferred.reject(error);
            }
          });
          getTransactionsByAccount($scope.addressId);
          return deferred.promise;
        } // getAddressInfos()

        function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
          if (endBlockNumber == null) {
            endBlockNumber = web3.eth.blockNumber;
            // console.log("Using endBlockNumber: " + endBlockNumber);
          }
          if (startBlockNumber == null) {
            startBlockNumber = ( endBlockNumber - 1000 < 0) ? 0: endBlockNumber - 1000;
            // console.log("Using startBlockNumber: " + startBlockNumber);
          }
          console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

          for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 == 0) {
              //console.log("Searching block " + i);
            }
            var block = web3.eth.getBlock(i, true);
            if (block != null && block.transactions != null) {
              $scope.transactions = [];
              block.transactions.forEach( function(result) {
                if (myaccount == "*" || myaccount == result.from || myaccount == result.to) {
                  /* console.log("  tx hash          : " + result.hash + "\n"
                    + "   nonce           : " + result.nonce + "\n"
                    + "   blockHash       : " + result.blockHash + "\n"
                    + "   blockNumber     : " + result.blockNumber + "\n"
                    + "   transactionIndex: " + result.transactionIndex + "\n"
                    + "   from            : " + result.from + "\n"
                    + "   to              : " + result.to + "\n"
                    + "   value           : " + result.value + "\n"
                    + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                    + "   gasPrice        : " + result.gasPrice + "\n"
                    + "   gas             : " + result.gas + "\n"
                    + "   input           : " + result.input); */

                    var transaction = {
                      id: result.hash,
                      hash: result.hash,
                      from: result.from,
                      to: result.to,
                      gas: result.gas,
                      input: result.input,
                      decoded: decodeData(result.input),
                      value: result.value
                    }

                    web3.eth.getTransactionReceipt(result.hash, function (err2, receipt) {
                      if(!err2) {
                          for (var attrname in receipt) { transaction[attrname] = receipt[attrname]; }
                      }

                      $scope.$apply(
                        $scope.transactions.push(transaction)
                      );
                    }); // getTransactionReceipt();
                } // if tx is for myaccount to or from
              }) // for each tx in block
            } // if there is tx in block
          } // for each block
        } // getTransactionsByAccount()

      };

      $scope.init();

    });
