/**
 * Created by kellysmith on 4/1/16.
 *
 * 2016 pokingBears.com
 */

function UserAuthService(){

	userAuth = {};
	var token;
	var authObject = {};

	userAuth.setToken = function(tkn){
		 token = tkn;
	};

	userAuth.getToken = function(){
		return token;
	};

	userAuth.setAuthObject = function(authObj){
		 authObject = authObj;
	};

	userAuth.getAuthObject = function(){

	};

	return userAuth;
}

angular.module('kbyteApp')
	.factory('UserAuthService', UserAuthService);


module.exports = UserAuthService;