/**
 * Created by kellysmith on 2/22/16.
 *
 * 2014 pokingBears.com
 */
'use strict';
var ChatSocket =  function (socketFactory) {
	console.log(' is there a socket factory avail ');
	var socket = socketFactory();
	socket.forward('broadcast');
	return socket;
};

angular.module('kbyteApp')
	.factory('ChatSocket', ChatSocket);

module.exports = ChatSocket;