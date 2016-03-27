/**
 * Created by kellysmith on 3/27/16.
 *
 * 2016 pokingBears.com
 */

function ModalScopeService() {

	var modalScope = {};

	this.setModalScope = function(mScope){
		modalScope = mScope;
	};

	this.getModalScope = function(){
		return modalScope;
	}
}

angular.module('kbyteApp')
	.service('ModalScopeService', ModalScopeService);

module.exports = ModalScopeService;