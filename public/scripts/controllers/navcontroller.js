/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */

/* @ngInject */
function NavController($state, EventFactory, ContentApis, UserAuthService) {

	var _this = this;
	this.navGreeting = 'KByteDesign';
	console.log(" this.navGreeting ", this.navGreeting);
	this.winLocation = window.location.href;

	//var userAuth = UserAuthService.getAuthObject();
	//if(typeof userAuth === 'object'){
	//	console.log(" user auth email and token in nav controller  "+userAuth.email+"  "+userAuth.displayname);
	//}


	var userInfoService = ContentApis;

	$("#signin").click(function (e) {
		console.log("  we have clicky poo");
		raiseLoginModal(e);
	})

	function raiseLoginModal(evt) {

		EventFactory.broadcast('login-modal',[evt,["LoginController","loginc"]]);
		console.log(" loginModal raised ");
	};

};

angular.module('kbyteApp')
	.controller('NavController', NavController);

module.exports = NavController;