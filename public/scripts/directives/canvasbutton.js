// Directive for canvas buttons, will typically
// Inside other media directives

function canvasButton(UIVisualConfigFactory){
    
    var elementId, active, buttonType, controllerFunction, canvasButtonSettings;


    function canvasButtonLink($scope, ele, attr, ctrl){


        elementId = attr.id;
        buttonType = attr.type;
        active = attr.active;
        
        canvasButtonSettings = UIVisualConfigFactory.getVisualSettings();
       
        for(voo in ele){
            //console.log(' stuff in element '+voo);
        }
        var canvas = document.getElementById(elementId);

        console.log(' canvas button settings '+canvasButtonSettings.canvasbuttons[buttonType].active.fillcolor+' the canvas '+canvas+'  scope  '+$scope);
        
        drawCanvas(canvasButtonSettings.canvasbuttons[buttonType].inactive, canvas);

        ele.on('mousedown', function(){
            toggleButton(canvas);
        });
    
    }

    function toggleButton(canvasBtn){

        console.log(" !!!!!!!!! toggle toggle "+active);


        if(active == 'inactive'){
            drawCanvas(canvasButtonSettings.canvasbuttons[buttonType].active, canvasBtn);
            active = 'active';
        } else {
            drawCanvas(canvasButtonSettings.canvasbuttons[buttonType].inactive, canvasBtn);
            active = 'inactive';
        }
        //controllerFunction();
    }

    function drawCanvas(btnSettings, canvas){

        var fillClr = btnSettings.fillcolor || '#FF2255';

        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
        ctx.beginPath();
        
        ctx.arc(27, 28, 24, 0, 2*Math.PI);
        ctx.lineWidth = 6;
        ctx.strokeStyle = btnSettings.strokecolor;
        //ctx.strokeRect(50,50,50,50);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(27, 28, 21, 0, 2*Math.PI);
        ctx.lineWidth = 4;
        ctx.strokeStyle = btnSettings.innerstrokecolor;
        //ctx.strokeRect(50,50,50,50);
        ctx.stroke();

        
        var fillValues = fillColorToDecimal(fillClr);

        ctx.fillStyle = 'rgba('+fillValues[0]+','+fillValues[1]+','+fillValues[2]+', '+btnSettings.fillalpha+')';
        ctx.fill();

        return ctx;

    }

    function fillColorToDecimal(fillString){

        var fillValues = [];

        for(var i = 1; i<fillString.length; i= i+2){

            var decValue = parseInt((fillString.substring(i, i+1)+fillString.substring(i+1, i+2)), 16);
            console.log("  decimal value  "+decValue);
            fillValues.push(decValue);
                
        }
        return fillValues;
    }


    return {

        restrict:'E',
        replace:true,
        scope:{},
        templateUrl:'../views/directive-templates/canvasbutton.html',
        link:canvasButtonLink,
     
    }
}

angular.module('kbyteApp')
    .directive('canvasButton', canvasButton);

module.exports.canvasButton = canvasButton; 