
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

	apiService.getEntry = function(){

		var entryVar = " Entry message ";

		return entryVar;
	};

	apiService.setEntry = function(userObject){

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
		});

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

