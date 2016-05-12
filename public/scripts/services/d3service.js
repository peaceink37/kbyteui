/**
 * Created by kellysmith on 4/10/16.
 *
 * 2016 pokingBears.com
 */

/* @ngInject */
function d3Service(){

	d3Service = d3;

	  return d3Service;
}

angular.module('kbyteApp')
	.factory('d3Service', d3Service);

module.exports = d3Service;
