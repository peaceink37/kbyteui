/**
 * Created by kellysmith on 10/27/15.
 *
 * 2016 pokingBears.com
 */

	function htmlEdit(){

		return {

			restrict: 'A',
			require: 'ngModel',
			scope: {},
			link: function(scope, element, attrs, ngModel){

				on(focus)
			}
		}

	}

	angular.module('kbyteApp')
		.directive('htmlEdit', htmlEdit);


module.exports.htmlEdit = htmlEdit;
