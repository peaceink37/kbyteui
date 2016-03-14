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

	function getStringOut() {

		var theString = "This be a comm string";
		_this.stringOut = theString.substr(5, 10);
	};

	getStringOut();
};

angular.module('kbyteApp')
	.controller('CommController', CommController);


module.exports = CommController;