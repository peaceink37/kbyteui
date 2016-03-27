/**
 * Created by kellysmith on 3/18/16.
 *
 * 2016 pokingBears.com
 */

'use strict';

/* @ngInject */
function HtmlEditController ($scope, EventFactory, EditorService){

	var _this = this;
	var currentElement;

	// TODO find out why this is having issues being bound
	// to _this
	$scope.htmlelements=["h1","h4","p"];


	// The _this binding is working fine here
	_this.setElement = function(elementValue){
		console.log(" element value "+elementValue);
		EventFactory.emit('elementset', elementValue);
	};

}

angular.module('kbyteApp')
	.controller('HtmlEditController', HtmlEditController);


module.exports = HtmlEditController;
