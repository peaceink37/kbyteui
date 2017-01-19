// video element

/*@ngInject*/
function videoElement(){

    var _this;

    function videoElementInit($scope, ele, attr, ctrl){

        _this = $scope;
        $scope.fart = "dookie";
        console.log('  video element kicks off  - controller object'+ele+'     '+ctrl);
        for(var doo in ctrl){
            //console.log(' doo '+doo+'    ele[doo] '+ctrl[doo]);
        }



    }


    // return the directive specifics
    return {


        restrict:'E',
        replace:true,
        scope:{},
        controller:'VideoController',
        controllerAs:'videoc',
        bindToController:true,
        templateUrl:'../views/directive-templates/videoelementtemp.html',
        link:videoElementInit



    }


}

angular.module('kbyteApp')
    .directive('videoElement', videoElement);


module.exports.videoElement = videoElement;