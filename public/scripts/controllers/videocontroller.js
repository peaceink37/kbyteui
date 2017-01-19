/**
 * Created by kellysmith on 9/12/16.
 *
 * 2016 pokingBears.com
 */
 'use strict'

/* @ngInject */
function VideoController($log, $scope, ContentApis, ChatSocket, ChatUsers, PhotoFilters, EventFactory, nickName){

    var VideoPost = ContentApis;

    var _this = this;
    _this.videoSession = {};
    _this.videoSession.inSession = false;
    _this.videoplaying = false;
    _this.videoSession.videoSessionState = 'Start Session';

    var currentImage;
    var video = document.querySelector('#video-chat');
    var vidObj = {video:true, audio:true};
    var videoStream;
    var vFormat = "";
    var mediaRecorder;
    var mediaConstraints = {
        audio:true,
        video:true
    };

    var blobStore = [];

    _this.infoData = {};
    _this.infoData.nickName = 'The Diaz Brothers';

    _this.videoSessionToggle = function(){

        console.log('  video session '+_this.videoSession.inSession);

        if(!_this.videoSession.inSession){
            _this.videoSession.inSession = true;
            startSession();
        } else {
            endSession();
        }
  
    };

    _this.postImage = function(){

        currentImage = PhotoFilters.getFilteredImage();
        ContentApis.postImage(currentImage, "what is the scenario");

    };

    _this.captureVideoStill = function(){

        console.log(' lets capture stuff ');

        if(_this.videoSession.inSession){
            console.log(" video type in capture video still "+video);
            PhotoFilters.setVideoObject(video);
            EventFactory.emit('imagetaken', video);
        
        } else {

            return new Error(' Unable To Capture Image. Please Check That Camera Is Working ');
        }
        
  
    };

   
    // Remember to use a deep watch - third argument true - if you're watching complex objects
    
    $scope.$watch('videoc.videoSession', function toggleVideo( newValue, oldValue ) {
            console.log( "videoc.videoSession:", newValue+"  IN SESSION ?  ",_this.videoSession.inSession);
            for(var doo in newValue){
                console.log(' watch doo '+doo+'    '+newValue[doo]);
            }
        }
    ,true);
    
    console.log(' video controller kicked off ');

    function startSession(){

        // create the get media method based on browser
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        _this.videoSession.videoSessionState = 'End Session';

        ChatSocket.emit('join', _this.infoData.nickName);

        // Scope chain breaks on this callback. When setting 
        // object.videosession = true within the callback the
        // value does not percolate without bringing in scope.apply
        function successCallback(stream){
                        
            console.log(" window user agent "+navigator.userAgent);

            var userAgent = navigator.userAgent;
            
            video.src = window.URL.createObjectURL(stream);
            videoStream = stream;
            
            if (userAgent.indexOf('Mozilla') !== -1){
                vFormat = 'webm';   
            } else {
                vFormat = 'mp4';
            }
                
            ChatSocket.emit('vidplay', stream);
            video.play();
            video.volume = 0.0;
           
        }

        function errorCallback(error){

            console.log(" get video media error ", error);

        }

        navigator.getUserMedia(vidObj, successCallback, errorCallback);


    };

    function endSession() {

        
        var vidTrack = videoStream.getTracks()[0], audioTrack = videoStream.getTracks()[1];
        
        console.log('  blob store '+blobStore);
        /*
        ChatSocket.emit('vidstop', blobStore);
        VideoPost.postBlob(blobStore)
            .success(function(data){
                console.log(' vid post worked '+data);
            })
            .error(function(err){
                console.log(' vid post err '+err.msg)
            })
        */
        vidTrack.stop();
        audioTrack.stop();
        
        video.src = '../images/aquateen213.'+vFormat;
        _this.videoSession.inSession = false;
        _this.videoSession.foo = "dope";
        _this.videoSession.videoSessionState = 'Start Session';

        
    };



 }


 angular.module('kbyteApp')
    .controller('VideoController', VideoController);

module.exports.VideoController = VideoController;