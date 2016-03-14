/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */

/* @ngInject */
function NavCtrl($rootScope, $state) {

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
		tObj.dork0 = "a dork";
		tObj.dork1 = "a small dork";
		tObj.dork2 = "a median dork";
		tObj.dork3 = "a large dork";
		tObj.dork4 = "a ginormous dork";

		for (var x in tObj) {
			console.log(" print the value sir " + tObj[x])
		}

		tObj.dork5 = function (val) {
			console.log(" are we not men? " + val);
		};

		tObj.dork5(" no sir, we are devo");
	};

};

angular.module('kbyteApp')
	.controller('NavCtrl', NavCtrl);

module.exports = NavCtrl;