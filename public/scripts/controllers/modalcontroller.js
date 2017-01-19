/**
 * Created by kellysmith on 3/26/16.
 *
 * 2016 pokingBears.com
 */

function ModalController($scope, $uibModal, $timeout, EventFactory, ContentApis, ModalScopeService) {

	var userPassService = ContentApis;
    var _this = this;

	var mController;
	var mControllerAs;

	ModalScopeService.setModalScope(_this);

	function raiseModal(){

		console.log(" raise modal function called ");

		var modalInstance = $uibModal.open({
				templateUrl: 'views/modal_useraccount.html',
				scope:$scope,
				keyboard: true,
				controller:mController,
				controllerAs:mControllerAs,
				bindToController:{
					mControllerAs:'='
				}
	        });

		_this.cancel = function(event) {
			console.log(" cancel in parent clicked ");
			modalInstance.dismiss('cancel');
		};
	};


	EventFactory.subscribe('login-modal',function(e, userInfo){

		console.log("  user info  "+userInfo[1]);

		mController = userInfo[1][0];
		mControllerAs = userInfo[1][1];

		$timeout(function(){
			raiseModal();
		},100)

	});

}

angular.module('kbyteApp')
	.controller('ModalController', ModalController);

module.exports = ModalController;
