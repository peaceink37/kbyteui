// photo filters for capture

function PhotoFilters(ColorMatrix, UIVisualConfigFactory){
    
    var photoFiltersConfig = UIVisualConfigFactory.getVisualSettings().photofilters;
    var filteredImage;
    var videoObject;
    var photoFilters = {};
    var ctx;


    function setCtx(context){

        var imageContext = context;
        //EventFactory.emit('imagetaken', imageContext);

    }
    
    for (foo in photoFiltersConfig){

        console.log("  value of photofilter foo  "+String(foo))
    }

    photoFilters.getFiltersConfig = function(){
        return photoFiltersConfig;
    }

    
    photoFilters.snapshot = function(ctx, source, top, left, width, height){
        ctx.drawImage(source, top, left, width, height);
            // "image/webp" works in Chrome.
            // Other browsers will fall back to image/png.
            //document.querySelector('img').src = canvas.toDataURL('image/webp');
        return ctx;
    }

    photoFilters.defaultFilter = function(filterObj, width, height){

      if(typeof filterObj === 'undefined'){
        return;
      }
      
       var texture = document.createElement('canvas');
       var ctx = texture.getContext('2d');

       texture.width = width;
       texture.height = height;

       console.log(" passed into default filter "+filterObj+" "+width+" "+height);
       // Fill a Radial Gradient
       // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
       var gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);

       // stop ranges are between 0 and 1
       gradient.addColorStop(filterObj.stops[0], filterObj.colors[0]);
       gradient.addColorStop(filterObj.stops[1], filterObj.colors[1]);
       gradient.addColorStop(filterObj.stops[2], filterObj.colors[2]);

       ctx.fillStyle = gradient;
       ctx.fillRect(0, 0, width, height);

       return ctx;
    }

    photoFilters.blend = function (background, foreground, width, height, transform) {
        var bottom = background.getImageData(0, 0, width, height);
        var top = foreground.getImageData(0, 0, width, height);

        for (var i = 0, size = top.data.length; i < size; i += 4) {
            // red
            top.data[i + 0] = transform(bottom.data[i + 0], top.data[i + 0]);
            // green
            top.data[i + 1] = transform(bottom.data[i + 1], top.data[i + 1]);
            // blue
            top.data[i + 2] = transform(bottom.data[i + 2], top.data[i + 2]);
            // the fourth slot is alpha. We don't need that (so skip by 4)
        }

        return top;
    }

    photoFilters.setVideoObject = function(vid){

        videoObject = vid;

    }

    photoFilters.setFilteredImage = function(canvas){

        filteredImage = canvas.toDataURL('image/jpeg',0.7);
    }

    photoFilters.getVideoObject = function(){
        return videoObject;
    }

    photoFilters.getImageCanvas = function(){
        return canvasImage;
    }

    photoFilters.getFilteredImage = function(){
        return filteredImage;
    }

    photoFilters.colorMatrix = ColorMatrix;


return photoFilters;

}

angular.module('kbyteApp')
    .factory('PhotoFilters', PhotoFilters);

module.exports.PhotoFilters = PhotoFilters;