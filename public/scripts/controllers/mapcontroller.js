/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */
'use strict'


/* @ng-inject */
function MapController($state, $rootScope, geolocation, ContentApis, MapService) {

	// Maps api key : AIzaSyCwh5EZxwhCELJDukSBmPARd0X6-fcF2hM

	var _this = this;
	var UserInfo = ContentApis;

	_this.formData = {};

	var coords = {};
	var lat = 0;
	var long = 0;

	_this.formData.latitude = 41.500;
	_this.formData.longitude = -81.350;

	// geolocation module is in bower and has been wrapped into browserify
	geolocation.getLocation().then(function (data) {

		// Set the latitude and longitude equal to the HTML5 coordinates
		coords = {lat: data.coords.latitude, long: data.coords.longitude};

		// Display coordinates in location textboxes rounded to three decimal points
		_this.formData.longitude = parseFloat(coords.long).toFixed(3);
		_this.formData.latitude = parseFloat(coords.lat).toFixed(3);

		// Display message confirming that the coordinates verified.
		_this.formData.htmlverified = "Yep (Thanks for giving us real data!)";

		MapService.refresh(_this.formData.latitude, _this.formData.longitude);

	});


	// Get coordinates based on mouse click. When a click event is detected....
	$rootScope.$on("mapclicked", function () {

		_this.formData.latitude = parseFloat(MapService.clickLat).toFixed(3);
		_this.formData.longitude = parseFloat(MapService.clickLong).toFixed(3);
		_this.formData.htmlverified = "Nope (Thanks for spamming my map...)";

	});


	// Creates a new user based on the form fields
	_this.createUser = function () {

		// Grabs all of the text box fields
		var userData = {
			username: _this.formData.username,
			gender: _this.formData.gender,
			age: _this.formData.age,
			favlang: _this.formData.favlang,
			location: [_this.formData.longitude, _this.formData.latitude],
			htmlverified: _this.formData.htmlverified
		};

		console.log(' this username in controller ' + _this.formData.username + "  " + userData.username);

		// Saves the user data to the db
		UserInfo.setLocation(userData)
			.success(function (data) {

				// Once complete, clear the form (except location)
				_this.formData.username = "";
				_this.formData.gender = "";
				_this.formData.age = "";
				_this.formData.favlang = "";

				MapService.refresh(_this.formData.latitude, _this.formData.longitude);
				console.log(" this damned thing worked again  " + data);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	};

};

angular.module('kbyteApp')
	.controller('MapController', MapController);








function MapQueryController($log, $rootScope, geolocation, ContentApis, MapService) {

	var _this = this;
	_this.formData = {};
	var queryBody = {};

	var QueryService = ContentApis;

	// Get User's actual coordinates based on HTML5 at window load
	geolocation.getLocation().then(function (data) {
		var coords = {lat: data.coords.latitude, long: data.coords.longitude};

		// Set the latitude and longitude equal to the HTML5 coordinates
		_this.formData.longitude = parseFloat(coords.long).toFixed(3);
		_this.formData.latitude = parseFloat(coords.lat).toFixed(3);
	});

	// Get coordinates based on mouse click. When a click event is detected....
	$rootScope.$on("mapclicked", function () {

		_this.formData.latitude = parseFloat(MapService.clickLat).toFixed(3);
		_this.formData.longitude = parseFloat(MapService.clickLong).toFixed(3);

	});

	// Take query parameters and incorporate into a JSON queryBody
	_this.queryUsers = function () {

		console.log(" query users clicked ");

		// Assemble Query Body
		var mapQueryBody = {
			longitude: parseFloat(_this.formData.longitude),
			latitude: parseFloat(_this.formData.latitude),
			distance: parseFloat(_this.formData.distance),
			male: _this.formData.male,
			female: _this.formData.female,
			other: _this.formData.other,
			minAge: _this.formData.minage,
			maxAge: _this.formData.maxage,
			favlang: _this.formData.favlang,
			reqVerified: _this.formData.verified
		};

		QueryService.postMapUserQuery(mapQueryBody)
			.success(function (queryResults) {

				// Query Body and Result Logging
				console.log("QueryBody:");
				console.log(queryBody);
				console.log("QueryResults:");
				console.log(queryResults);

				MapService.refresh(queryBody.latitude, queryBody.longitude, queryResults);

				// Count the number of records retrieved for the panel-footer
				_this.queryCount = queryResults.length;
			})
			.error(function (queryResults) {
				console.log('Error ' + queryResults);
			})
	};
};


angular.module('kbyteApp')
	.controller('MapQueryController', MapQueryController);


module.exports = MapController;
module.exports = MapQueryController;