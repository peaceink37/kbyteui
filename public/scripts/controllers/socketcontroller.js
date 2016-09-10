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
	_this.videoSession = false;
	_this.videoSessionState = 'Start Session';

	var video = document.querySelector('#video-chat');
	var vidObj = {video:true, audio:true};
	var videoStream;
	var vFormat = "";


	// We manage the chat session states
	_this.chatBtnStates = {
		joinActive:false,
		creativeActive:false,
		activeRooms:false,
		changeName:false,
		messaging:true
	}

	_this.videoSessionToggle = function(){

		if(!_this.videoSession){
			startSession();
		} else {
			endSession();
		}

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

	drawCanvas();

	function startSession(){

		// create the get media method based on browser
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		_this.videoSessionState = 'End Session';

		console.log(' navigator user media '+_this.videoSessionState+' dom vid obj '+video);

		ChatSocket.emit('join', _this.infoData.nickName);

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
	            	
	    	ChatSocket.emit('vidplay', videoStream);
			video.play();
			video.volume = 0.4;
			_this.videoSession = true;
			
		}

		function errorCallback(error){

			console.log(" get video media error ", error);

		}

		navigator.getUserMedia(vidObj, successCallback, errorCallback);


	};

	function endSession() {

		
		var vidTrack = videoStream.getTracks()[0];
		var audioTrack = videoStream.getTracks()[1]

		console.log('  hey oh .. can we stop the media ?');

		vidTrack.stop();
		audioTrack.stop();
		ChatSocket.emit('vidstop', videoStream);

		video.src = '../images/aquateen213.'+vFormat;
		_this.videoSession = false;
		_this.videoSessionState = 'Start Session';

		
	};

	// This will need to be a directive
	function drawCanvas(){

		var canvas = document.getElementsByClassName('video-playpause');
		for(var foo in canvas){
			console.log('  canvas '+canvas[foo]);
		}
		var ctx = canvas[0].getContext('2d');


		ctx.beginPath();
        ctx.arc(27, 28, 24, 0, 2*Math.PI);
        ctx.lineWidth = 6;
		ctx.strokeStyle = '#eeeded';
		//ctx.strokeRect(50,50,50,50);
		ctx.stroke();

		ctx.beginPath();
        ctx.arc(27, 28, 21, 0, 2*Math.PI);
        ctx.lineWidth = 4;
		ctx.strokeStyle = '#aabdbd';
		//ctx.strokeRect(50,50,50,50);
		ctx.stroke();

	}

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