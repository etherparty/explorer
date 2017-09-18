angular.module('ethExplorer')
     .controller('transactionInfosCtrl', function($rootScope, $scope, $location, $routeParams, $q) {

          var web3 = $rootScope.web3;

          $scope.init = function() {
               $scope.txId = $routeParams.transactionId;

               if ($scope.txId !== undefined) { // add a test to check if it match tx paterns to avoid useless API call, clients are not obliged to come from the search form...

                    getTransactionInfos()
                         .then(function(result) {
                              //TODO Refactor this logic, asynchron calls + services....
                              var number = web3.eth.blockNumber;

                              $scope.result = result;

                              if (result.blockHash !== undefined) {
                                   $scope.blockHash = result.blockHash;
                              } else {
                                   $scope.blockHash = 'pending';
                              }
                              if (result.blockNumber !== undefined) {
                                   $scope.blockNumber = result.blockNumber;
                              } else {
                                   $scope.blockNumber = 'pending';
                              }
                              $scope.from = result.from;
                              $scope.gas = result.gas;
                              $scope.gasPrice = result.gasPrice.c[0] + " WEI";
                              $scope.hash = result.hash;
                              $scope.input = result.input; // that's a string
                              $scope.nonce = result.nonce;
                              $scope.to = result.to;
                              $scope.transactionIndex = result.transactionIndex;
                              $scope.ethValue = result.value.c[0] / 10000;
                              $scope.txprice = (result.gas * result.gasPrice) / 1000000000000000000 + " ETH";
                              if ($scope.blockNumber !== undefined) {
                                   $scope.conf = number - $scope.blockNumber;
                                   if ($scope.conf === 0) {
                                        $scope.conf = 'unconfirmed'; //TODO change color button when unconfirmed... ng-if or ng-class
                                   }
                              }
                              //TODO Refactor this logic, asynchron calls + services....
                              if ($scope.blockNumber !== undefined) {
                                   var info = web3.eth.getBlock($scope.blockNumber);
                                   if (info !== undefined) {
                                        $scope.time = info.timestamp;
                                   }
                              }

                              // Display the converter button only if we have data
                              var inputData = result.input.trim();
                              if ((inputData.length == 0) || (inputData == '0x')) {
                                   $scope.showButton = false;
                              } else {
                                   $scope.showButton = true;
                              }

                              // Convert the input data from Hex to Ascii
                              $scope.$watch('toggle', function() {
                                   $scope.toggleText = $scope.toggle ? 'Back to Raw' : 'Convert to Ascii';
                                   if ($scope.toggleText == 'Back to Raw') {
                                        $scope.input = convertToAscii(result.input);
                                   } else {
                                        $scope.input = result.input;
                                   }
                              })

                         });

               } else {
                    $location.path("/"); // add a trigger to display an error message so user knows he messed up with the TX number
               }


               function getTransactionInfos() {
                    var deferred = $q.defer();

                    web3.eth.getTransaction($scope.txId, function(error, result) {
                         if (!error) {
                              deferred.resolve(result);
                         } else {
                              deferred.reject(error);
                         }
                    });
                    return deferred.promise;

               }

               function convertToAscii(rawString) {
                   var hex = rawString.toString();
                   var convertedString = '';
                   for (var i = 0; i < rawString.length; i += 2) {
                        convertedString += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                   }
                   return convertedString;
               }


          };
          $scope.init();
          console.log($scope.result);

     });
