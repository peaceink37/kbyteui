/**
 * Created by kellysmith on 3/9/16.
 *
 * 2016 pokingBears.com
 */
'use strict'

/* @ng-inject */
function SocketController($log, $scope, ChatSocket, EventFactory, UserAuthService, messageFormatter, nickName) {
	var _this = this;

	_this.infoData = {};
	_this.infoData.messages = [];
	_this.infoData.message = '';
	_this.infoData.nickName = 'Kelly';
	_this.infoData.roomName = 'TheLounge'
	_this.infoData.messageLog = 'Ready to chat!';
	

	// We manage the chat session states
	_this.chatBtnStates = {
		joinActive:false,
		creativeActive:false,
		activeRooms:false,
		changeName:false,
		messaging:true
	}

	
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

	EventFactory.subscribe('userupdated',function(e, data){
		console.log(" event subscribe fired for auth obj "+data.displayname);
		var authObj = UserAuthService.getAuthObject();
		_this.infoData.nickName = authObj.displayname;
		
	});

	

	// message is contained within event object
	ChatSocket.on('broadcast', function (event) {
		$log.debug('got a message', event.source+'  '+event.payload);
		$log.debug(' messages ', _this.infoData.messages);
		if (!event.payload) {
			$log.error('invalid message', 'event', event,
				'data', JSON.stringify(event.payload));
			return;
		}
		$scope.$apply(function () {
			_this.infoData.messages.unshift(
			messageFormatter(
				new Date(), event.source,
				event.payload)
			);
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