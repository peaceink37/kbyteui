/**
 * Created by kellysmith on 4/1/16.
 *
 * 2016 pokingBears.com
 */

function UserAuthService($window){

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
		$window.localStorage.setItem('uautho', JSON.stringify(authObj));
	};

	userAuth.getAuthObject = function(){
		var authObject = $window.localStorage.getItem('uautho');
		JSON.parse(authObject);
	    return authObject;
	};

	return userAuth;
}

angular.module('kbyteApp')
	.factory('UserAuthService', UserAuthService);


module.exports = UserAuthService;