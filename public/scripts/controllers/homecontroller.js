/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */


/* @ngInject */
function HomeController($rootScope, $state) {

	var _this = this;

	_this.stringOut = 'zibbyZub';

	function getStringOut() {

		var theString = "Something smells like kitty litter";
		return theString.substr(4, 20);
	};

	function callSaul(sug) {

		return 'Saul Aint Here Man ' + sug;

	}

	/* Practice section */

	function silly(outerThis) {

		// 'this' keyowrd in this context only works when instantiating this function using new keyword
		this.fourthSpot = 'DoomTree';

		console.log(" this on top " + this + "   " + outerThis.stringOut);
		this.spothead = {

			firstSpot: 'big',
			secondSpot: 'small',
			thirdSpot: callSaul

		}

		this.spothead.thirdSpot;
		var timeStuff = new Date();


		console.log(" date time " + timeStuff.getMonth() + "  " + timeStuff.getFullYear());

	}

	var superSilly = new silly(this);

	var footLoose = (function () {


	})(superSilly)


	console.log(' supersilly fourth spot ' + superSilly.fourthSpot + ' spothead ' + superSilly.spothead.thirdSpot('smoke') + "  " + _this.fourthSpot);

	/* End Practice Section */

	_this.stringOut = getStringOut();
};


angular.module('kbyteApp')
	.controller('HomeController', HomeController);



module.exports = HomeController;