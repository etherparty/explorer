// begin AltSheets changes
//////////////////////////
// Put go into a config.js
// But how to include a file from local?

var GETH_HOSTNAME	= "localhost";	// put your IP address!
var APP_HOSTNAME 	= "See package.json --> scripts --> start: Change 'localhost'!!!";

var GETH_RPCPORT  	= 8545; 		// for geth --rpcport GETH_RPCPORT
var APP_PORT 		= "See package.json --> scripts --> start: Perhaps change '8000'";

// this is creating the corrected geth command
var WL=window.location;
var geth_command	= "geth --rpc --rpcaddr "+ GETH_HOSTNAME + " --rpcport " + GETH_RPCPORT +'\
 --rpcapi "web3,eth" ' + ' --rpccorsdomain "' + WL.protocol +"//" + WL.host + '"';

// All this is documented well in   how-to/README.md
////////////////////////////////////////////////////
//end AltSheets changes

'use strict';
angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/transaction/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfos.html',
                controller: 'addressInfosCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(function($rootScope) {
        var web3 = require('web3');
        // begin AltSheets changes 
        web3.setProvider(new web3.providers.HttpProvider("http://"+GETH_HOSTNAME+":"+GETH_RPCPORT));
        // end AltSheets changes
        $rootScope.web3=web3;
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
        }
        var connected = false;
        if(!web3.isConnected()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'}) 
            $('#connectwarning').modal('show') 
        }
    });
