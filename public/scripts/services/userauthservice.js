/**
 *  Created by kellysmith on 4/1/16.
 *
 * 2016 pokingBears.com
 */

function UserAuthService($window, EventFactory){

	userAuth = {};
	userAuth.token = 'token';
	userAuth.uautho = 'uautho';

	userAuth.setToken = function(tkn){
		$window.localStorage.setItem('token', tkn);
	};

	userAuth.getToken = function(){
		var tk = $window.localStorage.getItem('token');
		return tk;
	};

	userAuth.setAuthObject = function(authObj) {
		var authString = JSON.stringify(authObj);
		console.log(' auth string '+authString+'    '+typeof authString);
		$window.localStorage.setItem('uautho', authString);
		EventFactory.emit('userupdated',authString);
	};

	userAuth.getAuthObject = function(){

		var authString = $window.localStorage.getItem('uautho');
		var authObject = JSON.parse(authString);
	    console.log(' ping get auth object '+ typeof authObject.displayname);
	    return authObject;
	};

	return userAuth;
}

angular.module('kbyteApp')
	.factory('UserAuthService', UserAuthService);


module.exports = UserAuthService;