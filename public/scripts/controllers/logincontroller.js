/**
 * Created by kellysmith on 3/26/16.
 *
 * 2016 pokingBears.com
 */

function LoginController(ContentApis, ModalScopeService, UserAuthService, $timeout) {

	var userPassService = ContentApis;

	var parentModalScope = ModalScopeService.getModalScope();
	var userAuthObject = {};

    var _this = this;
	_this.userInfo = {};
	_this.userInfo.email = "me@duh.net";
	_this.userInfo.displayname;
	_this.userInfo.userpass;
	_this.error = null;
	_this.processing = false;
	_this.postProcessing = {};
	_this.postProcessing.status;
	_this.okLabel = "Submit";
	_this.cancelLabel = "Cancel";


	_this.proceed = function() {

		console.log(" proceed be called "+_this.userInfo.displayname+"  pwd  "+_this.userInfo.userpass);
		_this.processing = true;
	    if(_this.userInfo.userpass.length < 6){
		    console.log(" pwd length ",_this.userInfo.userpass.length)
		    return;
	    }

		userPassService.userAuth(_this.userInfo, processResults);

	};

	_this.cancel = function() {
		console.log("  cancel called ");
		parentModalScope.cancel();
	}

	function processResults(resMessage){

		console.log(" res message "+resMessage.message);
		if(resMessage.success === true){
			_this.postProcessing.status = "Update Successful";
			buildAuthObject(resMessage);

			$timeout(function(){
				_this.processing = false;
				parentModalScope.cancel();
			},500);

		} else {
			console.log(" res message "+resMessage.success+"  "+resMessage.email+"  "+resMessage.token);
		}

	}

	function buildAuthObject(msg){

		userAuthObject = {
			email:msg.email,
			displayname:msg.displayname,
			token:msg.token
		}

		$timeout(function(){
			UserAuthService.setAuthObject(userAuthObject);
		},100);

		UserAuthService.setToken(msg.token);

	}

}

angular.module('kbyteApp')
	.controller('LoginController', LoginController);

module.exports = LoginController;
