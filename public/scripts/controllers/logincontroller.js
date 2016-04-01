/**
 * Created by kellysmith on 3/26/16.
 *
 * 2016 pokingBears.com
 */

function LoginController(ContentApis, ModalScopeService, $timeout) {

	var userPassService = ContentApis;

	var parentModalScope = ModalScopeService.getModalScope();

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
		if(resMessage.message === "true"){
			_this.postProcessing.status = "Update Successful";
			$timeout(function(){
				_this.processing = false;
				parentModalScope.cancel();
			},500);

		}

	}

}

angular.module('kbyteApp')
	.controller('LoginController', LoginController);

module.exports = LoginController;
