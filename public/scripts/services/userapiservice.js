/**
 * Created by kellysmith on 2/11/16.
 *
 * 2016 pokingBears.com
 */
'use strict';

/* @ngInject */
function ContentApis ($q, $http){


	function isDevelopmentMode() {
		return window.location.href.indexOf(':8080') > 0
			|| window.location.href.indexOf(':3000') > 0;
	}

	var apiService = {};
    apiService.apiRoot = "";

	if(isDevelopmentMode() === true){
		apiService.apiRoot = "http://localhost:3000/";
	} else {
		apiService.apiRoot = "http://kbytedesign.com/";
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

	apiService.getEntry = function(){


		var entryVar = {
			message:" Entry message ",
			language:"German"
		}

		return entryVar;
	};

	apiService.setEntry = function(userObject){
		console.log(" user object  "+userObject.userName);
		return $http({
			method: 'POST',
			url: apiService.apiRoot+'users/uentries',
			data: JSON.stringify(userObject),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
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

	return apiService;
}

angular.module('kbyteApp')
	.factory('ContentApis', ContentApis);


module.exports = ContentApis;

