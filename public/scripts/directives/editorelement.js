/**
 *  Created by kellysmith on 3/17/16.
 *
 * 2016 pokingBears.com
 */

function editorElement(EditorService){


	//console.log(" ping the directive ");

	function link(scope){

		//scope.htmlelements = EditorService.getElements();
	}

	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		bindToController:{
			htmlelements:'='
		},
		template:['<button class="btn btn-default" ng-repeat="element in htmlelements" ng-click="htmledit.setElement(element)"><span class="edit-btn-text">{{element}}</span></button>'].join(''),
		link:link

	};

}

function editorCanvas(EventFactory, EditorService, $timeout){

	var canvasElement;
	var elIdx = 0;

	function link(element, attrs, ctrl){

		canvasElement = element;

		EventFactory.subscribe('elementset',function(e, newEl){
			for(poopy in e) {
				console.log(" rip to phife ** forever tribe " + poopy+ "   "+newEl);
			}
			setElement(newEl);
		});
	}

	function setElement(newEl){

		var storedSelections = [];

		var newElement = angular.element("<"+newEl+"></"+newEl+">");
		console.log(" now we be talking "+newElement);

		$('.content-entry').append(newElement);
		var numElString = elIdx.toString();
		var newId = 'el'+numElString;
		$(newElement).attr('id',newId);

		$(newElement).html("\u0001");

		$timeout(function() {
			if(newElement)
				$(newElement).focus()
				var selection = rangy.getSelection();
				var range = rangy.createRange();
				var startNode = document.getElementById(newId);
				range.setStartAfter(startNode);
				range.setEndAfter(startNode);

				//apply this range to the selection object
				selection.removeAllRanges();
				selection.addRange(range);
				elIdx ++;
                //;
				console.log(" focus called "+newElement);
		},20);


		// do rangy stuff

		if(window.getSelection){
			var currentSelection = window.getSelection();
			for(var i = 0; i < currentSelection.rangeCount; i++){
				storedSelections.push(currentSelection.getRangeAt(i));
				console.log("  current selection range count "+currentSelection.getRangeAt(i));
			}
		}

	}


	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		template:['<div class="form-group"><div class="content-entry text-background" contenteditable="true" ng-maxlength="1000"></div></div>'].join(''),
		link:link
	};

}

angular.module('kbyteApp')
	.directive("editorElement", editorElement)
	.directive("editorCanvas", editorCanvas);


module.exports = editorElement;
module.exports = editorCanvas;

