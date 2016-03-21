/**
 * Created by kellysmith on 3/20/16.
 *
 * 2016 pokingBears.com
 */

function editorWrapper(){

	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		bindToController: {
			htmlelements: '='
		}
	};

}

angular.module('kbyteApp')
	.directive("editorWrapper", editorWrapper)

module.exports = editorWrapper;
