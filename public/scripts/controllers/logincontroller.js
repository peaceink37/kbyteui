/**
 * Created by kellysmith on 3/26/16.
 *
 * 2016 pokingBears.com
 */

function LoginController(ContentApis, ModalScopeService) {

	var userPassService = ContentApis;

	var parentModalScope = ModalScopeService.getModalScope();

    var _this = this;
	_this.username = "Kelly";
	_this.logpass = "Enter Your User Name and Password";

	_this.error = null;
	_this.allowSave = true;
	_this.okLabel = "Submit";
	_this.cancelLabel = "Cancel";

	_this.proceed = function() {

	};

	_this.cancel = function() {
		console.log("  cancel called ");
		parentModalScope.cancel();
	}

}

angular.module('kbyteApp')
	.controller('LoginController', LoginController);

module.exports = LoginController;
