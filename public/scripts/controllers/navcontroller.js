/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */

/* @ngInject */
function NavController($rootScope, $state) {

	var _this = this;
	this.navGreeting = 'KByteDesign';
	console.log(" this.navGreeting ", this.navGreeting);
	this.winLocation = window.location.href;

	$("#signin").click(function (e) {
		console.log("  we have clicky poo");
		raiseSigninModal(e);
	})

	var raiseSigninModal = function (evt) {

		var littleGreenMen = function (val) {
			console.log(" are we not men? " + val);
		}
		console.log(" signin modal function called ");
		var tObj = {};
		tObj.signinName = "";
		tObj.pass = "";

		for (var x in tObj) {
			console.log(" print the value sir " + tObj[x])
		}

		tObj.funval = function (val) {
			console.log(" are we not men? " + val);
		};

		tObj.funval(" no sir, we are devo");
	};

};

angular.module('kbyteApp')
	.controller('NavController', NavController);

module.exports = NavController;