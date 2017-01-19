/**
 * Created by kellysmith on 2/11/16.
 *
 * 2016 pokingBears.com
 */
'use strict';

/* @ngInject */
function ContentApis ($q, $http, UserAuthService, UrlRootService, FormDataObject){

	
	var apiService = {};
    apiService.apiRoot = UrlRootService.getUrlRoot();
    console.log(' apiService.apiRoot  '+apiService.apiRoot);

    apiService.getUIConfig = function(){

    	return $http({
    		method:'GET',
    		url:apiService.apiRoot+'ui-visual.conf',
    		headers:{
    			'Content-Type':'application/json; charset=utf-8'
    		}


    	}).then(function(response){
    		console.log(' ui response data '+response.data);
    		return response.data;
    	})

    }

	apiService.getLog = function(callback){

		return $http({
		    method:'GET',
			url:apiService.apiRoot+'access2.log',
			headers:{
				'Content-Type':'text/plain'
			}
		}).then(
			function(logstring){
				//console.log(' log string in the house '+logstring.data.split('\n'));
				callback(logstring.data);
			},
			function(httpError){
				throw httpError.status+' : '+httpError.data;
			}
		)
	}

	apiService.postImage = function(imageData, msg){

		console.log(' api service '+imageData);
		var payload = new FormData();
		payload.append('message', msg);
		payload.append('imgbase64', imageData);

		return $http({

			method:'POST',
			url:apiService.apiRoot+'users/postimage',
			data:payload,
			doodoo:"Breaking the law",
			transformRequest:angular.identity,
			headers:{
				'Content-Type':undefined
			}

		}).then({
			function(response){
				return response.data;
			},
			function(httpError){
				throw httpError.status+':'+httpError.data;
			}

		})
	}

	
	apiService.userAuth = function(userPass, callback){

		console.log(" user pass displayname "+userPass.displayname);

		return $http({
			method:'POST',
			url:apiService.apiRoot+'api/userauth',
			data:JSON.stringify(userPass),
			headers:{
				'Content-Type':'application/json; charset=utf-8'
			}
		}).then(
			function(response){
				// put email already used error and such here
				console.log(" client response data for auth "+response.data);
				callback(response.data);

			},
			function(httpError){
				throw httpError.status+" : "+httpError.data;
			}
		)

	}

	apiService.passReset = function(userEmail){

		return $http({
			method:'POST',
			url:apiService.apiRoot+'api/resetpass',
			data:JSON.stringify(userEmail),
			headers:{
				'Content-Type':'application/json; charset=utf-8'
			}
		}).then(
			function(response){

				console.log(" Email was appearently sent ");

			},function(httpError){
				throw httpError.status+" : "+httpError.data;
			}
		)

	}

	apiService.getEntry = function(){

		console.log(" get entry called from resolve ");
		var entryVar = {
			message:" Entry message ",
			language:"German"
		}

		return entryVar;
	};

	apiService.setEntry = function(userObject){

		var authtoken  = UserAuthService.getToken(UserAuthService.token);
		console.log(" user object  "+userObject.userName+"   "+authtoken);
		return $http({
			method: 'POST',
			url: apiService.apiRoot+'users/setuentry',
			data: JSON.stringify(userObject),
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'x-access-token': authtoken
			}
		});

	};

	apiService.retrieveEntries = function(key){

		if(typeof key === 'undefined'){
			key = 'empty';
		}

		return $http({
			method: 'GET',
			url: apiService.apiRoot+'users/uentries',
			data: JSON.stringify(key),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then(function(response){
				//if there is an error it will be handled by the controller
				return response.data;
		})
	};

	apiService.setLocation = function(userObject){

		console.log(" location username "+userObject.username);

		return $http({
			method: 'POST',
			url: apiService.apiRoot+'users/ulocations',
			data: JSON.stringify(userObject),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		})

	};

	apiService.retrieveLocations = function(key){

		if(typeof key === 'undefined'){
			key = 'empty';
		}

		return $http({
			method: 'GET',
			url: apiService.apiRoot+'users/ulocations',
			data: JSON.stringify(key),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		})
	};

	apiService.postMapUserQuery = function(queryObject){

		return $http({
			method: 'POST',
			url: apiService.apiRoot+'users/locationquery',
			data: JSON.stringify(queryObject),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});


	};

	apiService.postBlob = function(blobObj){

		return $http({
			method: 'POST',
			url: apiService.apiRoot+'content/blob',
			transformRequest:[],
			data:new Uint8Array(blobObj),
			headers:{'Content-Type':undefined}


		}).then(
			function(response){
				//console.log(" response data "+response.data);
				return response.data;
			},
			function (httpError) {
				// translate the error
				throw httpError.status + " : " +httpError.data;
			}

		)


	};

	return apiService;
}

// User set and retrival 

function UserApis($http, UrlRootService){

	userService = {};
	userService.userRoot = UrlRootService.getUrlRoot();
	
	userService.getUsers = function(queryObject){

		return $http({
			method:'GET',
			url:userService.userRoot+'users/getchatters',
			data:JSON.stringify(queryObject),
			headers:{
				'Content-Type': 'application/json; charset=utf-8'
			}

		}).then(
			function(data){

				console.log(' it worked '+data)
			},
			function(errmsg){
				throw errmsg.status + " : " +errmsg.data;
			}

		)
	}

	return userService;

}

angular.module('kbyteApp')
	.factory('ContentApis', ContentApis)
	.factory('UserApis', UserApis);


module.exports = ContentApis;
module.exports = UserApis;



