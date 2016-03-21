/**
 * Created by kellysmith on 3/17/16.
 *
 * 2014 pokingBears.com
 */

function editorElement(){

	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		bindToController:{
			htmlelements:'='
		},
		template:'<button class="btn btn-default" ng-repeat="htmlelement in htmledit.htmlelements" ng-click="htmledit.setElement(htmlelement)">{{htmlelement}}</button>'

	};

	console.log(" ping the directive ");

}

function editorCanvas(EventFactory){

	var canvasElement;

	function link(element, attrs, ctrl){

		canvasElement = element;

		EventFactory.subscribe('elementset',function(e, newEl){
			for(poopy in e) {
				console.log(" big ups to event factories " + poopy+ "   "+newEl);
			}
			doStuff(newEl);
		})
	}

	function doStuff(newEl){

		var newElement = angular.element("<"+newEl+"></"+newEl+">");
		console.log(" now we be talking "+newElement);
		$('.content-entry').append(newElement);
	}

	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		bindToController: {
			htmlelements: '='
		},
		template:'<div class="form-group"><div class="content-entry text-background" contenteditable="true" ng-maxlength="1000"></div></div>',
		link:link
	};

}

angular.module('kbyteApp')
	.directive("editorElement", editorElement)
	.directive("editorCanvas", editorCanvas);


module.exports = editorElement;
module.exports = editorCanvas;