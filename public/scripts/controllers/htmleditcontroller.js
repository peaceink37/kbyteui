/**
 * Created by kellysmith on 3/18/16.
 *
 * 2016 pokingBears.com
 */

'use strict';

/* @ngInject */
function HtmlEditController (EventFactory, EditorService){

	var _this = this;
	var currentElement;

	_this.htmlelements = [
        "h1",
		"h4",
		"p"
	];

	_this.getElement = function(){
		return currentElement;
	}

	_this.setElement = function(elementValue){
		console.log(" element value "+elementValue);

		EventFactory.broadcast('elementset', elementValue);
	};

}

angular.module('kbyteApp')
	.controller('HtmlEditController', HtmlEditController);


module.exports = HtmlEditController;
