/**
 * Created by kellysmith on 10/16/16.
 *
 * 2016 pokingBears.com
 */

// Directive for capturing canvas images
'use strict'

/* @ngInject */
function photoFilterThumbs(PhotoFilters, EventFactory){


    function renderFilteredCanvas(filterObj, imgCtx, fullSizeName){

        var canvasName = fullSizeName || filterObj.name;
        var canvas = document.getElementById(canvasName);
        console.log(" canvas element on filters "+filterObj.name+"  canvas  "+canvas+"   image  "+imgCtx);

        var ctx = imgCtx;
        //canvas.getContext('2d');

        if(fullSizeName === "video-still"){
            console.log("  CLEAR THE CANVAS "+filterObj.name)
            ctx.clearRect(0, 0, canvas.width, canvas.height);    
        }
        
        
        

        var image = PhotoFilters.snapshot(imgCtx, video, 0, 0, canvas.width, canvas.height);
        var dFilter = PhotoFilters.defaultFilter(filterObj, canvas.width, canvas.height);
        var blended = PhotoFilters.blend(dFilter, imgCtx, canvas.width, canvas.height, function(bottomPixel, topPixel) {
            return 255 - (255 - topPixel) * (255 - bottomPixel) / 255;
        });
        var imageCorrect = PhotoFilters.colorMatrix(blended, {contrast:80, brightness:-30});
        ctx.putImageData(imageCorrect, 0, 0);

        //currentImage = 
        PhotoFilters.setFilteredImage(canvas);
        

    }

    function buildFilterList(){

        var filterList = [];
        var photofilters = PhotoFilters.getFiltersConfig();

        for (foo in photofilters){
            var filterObj = photofilters[foo];
            filterObj.name = String(foo);
            filterList.push(filterObj);
        }

        return filterList;

    }
    

    function photoFilterThumbLink($scope, attr, ele, ctrl){

        $scope.photothumbs = buildFilterList();

        // listen for capture event, then render all the thumbs
        var mainCtx;
        EventFactory.subscribe('imagetaken', function(e, videoObject){

            mainCtx = imageContext;
            console.log('context element '+imageContext);

            for(var i = 0; i < $scope.photothumbs.length; i++){
                // the 3rd argument needs to be omitted here
                renderFilteredCanvas($scope.photothumbs[i], imageContext);    
            }
        })

        $scope.setMainStill = function(thumbphoto){

            renderFilteredCanvas(thumbphoto, mainCtx, "video-still");

        }

    
    }






    return {

        restrict:'E',
        replace:true,
        scope:{},
        templateUrl:'../views/directive-templates/photofilterthumbs.html',
        link:photoFilterThumbLink

    }

}

angular.module('kbyteApp')
    .directive('photoFilterThumbs', photoFilterThumbs);

module.exports.photoFilterThumbs = photoFilterThumbs;