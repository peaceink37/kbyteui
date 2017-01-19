/**
 * UI visual config to be used by directives, i.e. canvasButton
 * Created by kellysmith on 10/6/16.
 *
 * 2016 pokingBears.com
 */
 'use strict'

/* @ngInject */
function UIVisualConfigFactory(ContentApis, $q){

    var uiVisualSettings;

    for(doo in uiVisualSettings){
        console.log( uiVisualSettings[doo]);
    }
    

    return {

        resolve: function (){
            ContentApis.getUIConfig().then(function(data){
                uiVisualSettings = data;
                console.log("  ui visual settings "+uiVisualSettings.canvasbuttons);
            })
            .catch(function(){
                uiVisualSettings = 'ERROR: Unable To Retrieve UI Config Values';
            });
        },
        getVisualSettings: function(){
            return uiVisualSettings;
            
        }

    }
}


 angular.module('kbyteApp')
    .factory('UIVisualConfigFactory',UIVisualConfigFactory);

module.exports.UIVisualConfigFactory = UIVisualConfigFactory;