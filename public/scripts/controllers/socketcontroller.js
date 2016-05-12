/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */
'use strict'

/* @ng-inject */
function SocketController($log, $scope, ChatSocket, messageFormatter, nickName) {
	var _this = this;

	_this.infoData = {};
	_this.messages = []
	_this.infoData.message = '';
	_this.infoData.nickName = 'Kelly';
	_this.infoData.roomName = 'TheLounge'
	_this.infoData.messageLog = 'Ready to chat!';


	_this.chatBtnStates = {
		joinActive:false,
		creativeActive:false,
		activeRooms:false,
		changeName:false,
		messaging:true
	}

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	console.log(' navigator user media '+navigator.getUserMedia);

	ChatSocket.emit('join', _this.infoData.nickName);

	_this.sendMessage = function () {
		var match = _this.infoData.message.match('^\/namechange (.*)');

		if (angular.isDefined(match) &&
			angular.isArray(match) && match.length === 2) {
			var oldNick = _this.infoData.nickName;
			console.log("  in the match pattern for nickname HI " + _this.infoData.nickName);
			_this.infoData.nickName = match[1];
			_this.infoData.message = ' ';
			console.log("  in the match pattern for nickname LO " + _this.infoData.nickName);
			_this.infoData.messageLog = messageFormatter(new Date(),
				nickName, 'nickname changed - from ' +
				oldNick + ' to ' + _this.infoData.nickName + '!') +
			_this.infoData.messageLog;
		}

		$log.debug('sending message', _this.infoData.message);
		ChatSocket.emit('message', _this.infoData.nickName, _this.infoData.message);
		$log.debug('message sent', _this.infoData.message);
		_this.infoData.message = '';
	};

	_this.createRoom = function () {
		$log.debug(' create room ', _this.infoData.roomName);
		ChatSocket.emit('createRoom', _this.infoData.roomName);
	};

	_this.joinRoom = function (roomname) {
		$log.debug(' join room ', roomname);
		ChatSocket.emit('joinRoom', roomname);
	};

	$scope.$on('socket:broadcast', function (event, data) {
		$log.debug('got a message', event.name);
		if (!data.payload) {
			$log.error('invalid message', 'event', event,
				'data', JSON.stringify(data));
			return;
		}
		$scope.$apply(function () {
			_this.infoData.messageLog = messageFormatter(
				new Date(), data.source,
				data.payload) + $scope.messageLog;
		});

	});

};

angular.module('kbyteApp')
	.controller('SocketController', SocketController)
	.value('messageFormatter', function (date, nick, message) {
		return date.toLocaleTimeString() + ' - ' +
			nick + ' - ' +
			message + '\n';
	});

module.exports = SocketController;