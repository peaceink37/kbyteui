/**
 * Created by kellysmith on 9/16/16.
 *
 * 2016 pokingBears.com
 */

// Directive for capturing canvas images
'use strict'

/* @ngInject */
function canvasImage(){
    

    function imageLinkFunction($scope, attr, ele, ctrl){

        console.log('  boot scoot '+$scope);

    }






    return {

        restrict:'E',
        replace:true,
        scope:{},
        templateUrl:'../views/directive-templates/canvasimage.html',
        link:imageLinkFunction

    }

}

angular.module('kbyteApp')
    .directive('canvasImage', canvasImage);

module.exports.canvasImage = canvasImage;