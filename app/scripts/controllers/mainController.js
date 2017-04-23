function getBlock(web3, index) {
	block = web3.eth.getBlock(index);
	block.timestamp = block.timestamp + '000';
	return block;
}
angular.module('ethExplorer')
    .controller('mainCtrl', ['$rootScope', '$scope', '$interval', '$location', function ($rootScope, $scope, $interval, $location) {

	var web3 = $rootScope.web3;
	var maxBlocks = 50; // TODO: into setting file or user select
	var blockNumMax = $scope.blockNum = parseInt(web3.eth.blockNumber, 10);
	if (maxBlocks > blockNumMax) {
	    maxBlocks = blockNumMax;
	}
    var lastBlockNum = blockNumMax - maxBlocks;

	// get latest 50 blocks
	$scope.blocks = [];
	for (var i = lastBlockNum; i <= blockNumMax ; ++i) {
		$scope.blocks.unshift(getBlock(web3, i));
		lastBlockNum = i;
	}

	stop = $interval(function() {
		blockNumMax = $scope.blockNum = parseInt(web3.eth.blockNumber, 10);
		if (lastBlockNum < blockNumMax) {
			for (var i = lastBlockNum + 1; i <= blockNumMax; ++i) {
				$scope.blocks.unshift(getBlock(web3, i));
				lastBlockNum = i;
				if ($scope.blocks.length > maxBlocks)
					$scope.blocks.pop();
			}
		}
	}, 7*1000);

	$scope.$on('$destroy', function() {
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	});
        $scope.processRequest = function() {
             var requestStr = $scope.ethRequest.split('0x').join('');

            if (requestStr.length === 40)
              return goToAddrInfos(requestStr)
            else if(requestStr.length === 64) {
              if(/[0-9a-zA-Z]{64}?/.test(requestStr))
                return goToTxInfos(requestStr)
              else if(/[0-9]{1,7}?/.test(requestStr))
                return goToBlockInfos(requestStr)
            }else if(parseInt(requestStr) > 0)
              return goToBlockInfos(parseInt(requestStr))

            alert('Don\'t know how to handle '+ requestStr)
        };


        function goToBlockInfos(requestStr) {
            $location.path('/block/'+requestStr);
        }

        function goToAddrInfos(requestStr) {
            $location.path('/address/'+requestStr);
        }

         function goToTxInfos (requestStr) {
             $location.path('/transaction/'+requestStr);
        }

    }]);
