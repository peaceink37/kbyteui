// url roots

function UrlRootService(){

    
    // Two development modes: 3000 indicates local node
    // environment, while 8080 is local webserver using
    // stubbed data

    var apiRoot;

    function isDevelopmentMode() {
        return window.location.href.indexOf(':8080') > 0
            || window.location.href.indexOf(':3000') > 0;
    }

    if(isDevelopmentMode() === true){
        //apiService.apiRoot = 'http://192.168.0.5:3000/';
        apiRoot = 'http://localhost:3000/';
    } else {
        apiRoot = 'http://kbytedesign.com/';
    }

    // Are we retrieving users or content?
    // Is there mapping involved between user and content?
    urlRoot = {};

    urlRoot.getUrlRoot = function(){

        return apiRoot;
    }

    return urlRoot;




}

angular.module('kbyteApp')
    .factory('UrlRootService', UrlRootService);

module.exports.UrlRootService = UrlRootService;