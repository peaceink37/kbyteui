/**
 * Created by kellysmith on 2/22/16.
 *
 * 2016 pokingBears.com
 */
'use strict';

function ChatSocket(socketFactory) {
	console.log(' is there a socket factory avail '+socketFactory);
	var socket = socketFactory();
	socket.forward('broadcast');
	return socket;
};

angular.module('kbyteApp')
	.factory('ChatSocket', ChatSocket);

module.exports = ChatSocket;