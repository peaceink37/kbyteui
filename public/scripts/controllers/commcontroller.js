/**
 * Created by kellysmith on 3/9/16.
 *
 * 2016 pokingBears.com
 */


/* @ngInject */
function CommController($rootScope, $state, commApiResult) {

	var _this = this;

	_this.stringOut = '';

	_this.commApiResult = commApiResult;

	if(_this.commApiResult.message.indexOf('message') != -1){
		_this.commApiResult = 'The Aqua Teens Love You';
	}

	function getStringOut() {

		var theString = "We selected this video especially for you";
		_this.stringOut = theString.substr(0, theString.length);
	};

	getStringOut();
};

angular.module('kbyteApp')
	.controller('CommController', CommController);


module.exports = CommController;