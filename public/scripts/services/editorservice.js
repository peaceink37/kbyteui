/**
 * Created by kellysmith on 3/18/16.
 *
 * 2016 pokingBears.com
 */

'use strict'

function EditorService ($rootScope){


	this.getElements = function(){

		var htmlelements=[
			"h1",
			"h4",
			"p"
		];

		return htmlelements;

	}


}

angular.module('kbyteApp')
	.service('EditorService', EditorService);