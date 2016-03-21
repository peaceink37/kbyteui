/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */


/* @ngInject */
function CommController($rootScope, $state, ContentApis) {

	var _this = this;

	_this.stringOut = '';

	var commApis = ContentApis;

	_this.commApiResult = commApis.getEntry();

	if(_this.commApiResult.indexOf('message') != -1){
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