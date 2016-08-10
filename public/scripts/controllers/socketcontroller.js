/**
 * Created by kellysmith on 3/9/16.
 *
 * 2016 pokingBears.com
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

	// create the get media method based on browser
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	console.log(' navigator user media ');

	ChatSocket.emit('join', _this.infoData.nickName);

	var video = document.querySelector('#video_chat');
	var vidObj = {video:true, audio:true};
	var videoStream;
	var vFormat = "";

	function successCallback(vidStream){

		window.stream = videoStream = vidStream;

		console.log(" window user agent "+navigator.userAgent);

		var userAgent = navigator.userAgent;
		
    	video.src = window.URL.createObjectURL(videoStream);
        
        if (userAgent.indexOf('Mozilla') !== -1){
        	vFormat = 'webm';	
        } else {
    		vFormat = 'mp4';
        }
            	
    	
		video.play();
		video.volume = 0.4;
	}

	function errorCallback(error){

		console.log(" get video media error ", error);

	}

	navigator.getUserMedia(vidObj, successCallback, errorCallback);

	_this.endSession = function() {

		
		var vidTrack = videoStream.getTracks()[0];
		var audioTrack = videoStream.getTracks()[1]

		console.log('  hey oh .. can we stop the media ?');

		vidTrack.stop();
		audioTrack.stop();

		video.src = '../images/aquateen213.'+vFormat;

		
	};


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