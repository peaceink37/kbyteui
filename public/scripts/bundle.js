(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./main');
require('./controllers/homecontroller');
require('./controllers/navcontroller');
require('./controllers/commcontroller');
require('./controllers/blogcontroller');
require('./controllers/socketcontroller');
require('./controllers/mapcontroller');


//require('KMapsCtrl');
//require('MapQueryCtrl');

require('./services/userapiservice');
require('./services/mapservice');
require('./services/socketservice');
},{"./controllers/blogcontroller":2,"./controllers/commcontroller":3,"./controllers/homecontroller":4,"./controllers/mapcontroller":5,"./controllers/navcontroller":6,"./controllers/socketcontroller":7,"./main":8,"./services/mapservice":9,"./services/socketservice":10,"./services/userapiservice":11}],2:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */
'use strict'

function BlogController($state, $q, $sce, ContentApis) {

	var UserInfo = ContentApis;
	var _this = this;

	_this.setEntryMessage = "We'll see how it goes."
	_this.formInfo = {};
	_this.userIdChange = "";
	_this.formInfo.title = " da book of mack ";
	_this.formInfo.comments = " don't hurt em hammer ";
	_this.formInfo.bodyBooty = " blah blah doop ";
	_this.formInfo.hidden = false;
	_this.formInfo.userComments = [];


	_this.submitUserEntry = function () {

		_this.formInfo.userId = _this.userIdChange;
		var entryMessage = "";
		//var deferred = $q.

		_this.formInfo.comments = $(".content-entry").html();

		console.log(" userId " + _this.formInfo.comments + "  " + _this.formInfo.userName)

		UserInfo.setEntry(this.formInfo)
			.success(function (data) {
				if (data.Result === true) {
					entryMessage = "Well, the damned thing worked.";
					_this.retreiveUserEntries();
				} else {
					entryMessage = "Something bad happened on the validation side";
				}
				setEntryMessage(entryMessage);
			})
			.error(function (data) {
				console.error('could not retrieve user data', data);
			});

	}

	function setEntryMessage(msg) {

		_this.setEntryMessage = msg;

	};

	function setComments(com) {
		console.log(" retrieve com  " + com);
		_this.userComments = com;
	}

	_this.retreiveUserEntries = function () {
		UserInfo.retrieveEntries()
			.success(function (data) {
				angular.forEach(data, function (v, k) {
					console.log(" retrieve com  " + data[k].uid + "  " + v);
					var userAndComment = {};
					userAndComment.user = data[k].uid;
					var textToHtml = data[k].comments.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
					userAndComment.comment = textToHtml;
					console.log(" textToHTML var " + textToHtml);
					_this.formInfo.userComments.push(userAndComment);

				})
				// put all the comments into an array and then join them up

			})
			.error(function (data) {
				console.error(' this request has pooped the bed');
			})

	};

	_this.retreiveUserEntries();
}
BlogController.$inject = ["$state", "$q", "$sce", "ContentApis"];;

angular.module('kbyteApp')
	.controller('BlogController', BlogController);



module.exports = BlogController;
},{}],3:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */


/* @ngInject */
function CommController($rootScope, $state, ContentApis) {

	var _this = this;

	_this.stringOut = '';

	var commApis = ContentApis;

	_this.commApiResult = commApis.getEntry();

	function getStringOut() {

		var theString = "This be a comm string";
		_this.stringOut = theString.substr(5, 10);
	};

	getStringOut();
}
CommController.$inject = ["$rootScope", "$state", "ContentApis"];;

angular.module('kbyteApp')
	.controller('CommController', CommController);


module.exports = CommController;
},{}],4:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */


/* @ngInject */
function HomeController($rootScope, $state) {

	var _this = this;

	_this.stringOut = 'zibbyZub';

	function getStringOut() {

		var theString = "Something smells like kitty litter";
		return theString.substr(4, 20);
	};

	function callSaul(sug) {

		return 'Saul Aint Here Man ' + sug;

	}

	/* Practice section */

	function silly(outerThis) {

		// 'this' keyowrd in this context only works when instantiating this function using new keyword
		this.fourthSpot = 'DoomTree';

		console.log(" this on top " + this + "   " + outerThis.stringOut);
		this.spothead = {

			firstSpot: 'big',
			secondSpot: 'small',
			thirdSpot: callSaul

		}

		this.spothead.thirdSpot;
		var timeStuff = new Date();


		console.log(" date time " + timeStuff.getMonth() + "  " + timeStuff.getFullYear());

	}

	var superSilly = new silly(this);

	var footLoose = (function () {


	})(superSilly)


	console.log(' supersilly fourth spot ' + superSilly.fourthSpot + ' spothead ' + superSilly.spothead.thirdSpot('smoke') + "  " + _this.fourthSpot);

	/* End Practice Section */

	_this.stringOut = getStringOut();
}
HomeController.$inject = ["$rootScope", "$state"];;


angular.module('kbyteApp')
	.controller('HomeController', HomeController);



module.exports = HomeController;
},{}],5:[function(require,module,exports){
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

}
MapController.$inject = ["$state", "$rootScope", "geolocation", "ContentApis", "MapService"];;

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
}
MapQueryController.$inject = ["$log", "$rootScope", "geolocation", "ContentApis", "MapService"];;


angular.module('kbyteApp')
	.controller('MapQueryController', MapQueryController);


module.exports = MapController;
module.exports = MapQueryController;
},{}],6:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */

/* @ngInject */
function NavCtrl($rootScope, $state) {

	var _this = this;
	this.navGreeting = 'KByteDesign';
	console.log(" this.navGreeting ", this.navGreeting);
	this.winLocation = window.location.href;

	$("#signin").click(function (e) {
		console.log("  we have clicky poo");
		raiseSigninModal(e);
	})

	var raiseSigninModal = function (evt) {

		var littleGreenMen = function (val) {
			console.log(" are we not men? " + val);
		}
		console.log(" signin modal function called ");
		var tObj = {};
		tObj.dork0 = "a dork";
		tObj.dork1 = "a small dork";
		tObj.dork2 = "a median dork";
		tObj.dork3 = "a large dork";
		tObj.dork4 = "a ginormous dork";

		for (var x in tObj) {
			console.log(" print the value sir " + tObj[x])
		}

		tObj.dork5 = function (val) {
			console.log(" are we not men? " + val);
		};

		tObj.dork5(" no sir, we are devo");
	};

}
NavCtrl.$inject = ["$rootScope", "$state"];;

angular.module('kbyteApp')
	.controller('NavCtrl', NavCtrl);

module.exports = NavCtrl;
},{}],7:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */
'use strict'

/* @ng-inject */
function SocketController($log, $scope, ChatSocket, messageFormatter, nickName) {
	var _this = this;

	_this.infoData = {};
	_this.messages = []
	_this.infoData.message = '';
	console.log(" init the socket controller ");
	_this.infoData.nickName = nickName;
	_this.infoData.roomName = 'TheLounge'
	_this.infoData.messageLog = 'Ready to chat!';
	_this.infoData.joinActive = false;
	_this.infoData.creativeActive = false;

	_this.sendMessage = function () {
		var match = _this.infoData.message.match('^\/namechange (.*)');

		if (angular.isDefined(match) &&
			angular.isArray(match) && match.length === 2) {
			var oldNick = _this.infoData.nickName;
			console.log("  in the match pattern for nickname HI " + _this.infoData.nickName);
			_this.infoData.nickName = match[1];
			_this.infoData.message = ' ';
			console.log("  in the match pattern for nickname LO " + _this.infoData.nickName);
			_this.infoData.messageLog = messageFormatter(new Date(),
				nickName, 'nickname changed - from ' +
				oldNick + ' to ' + _this.infoData.nickName + '!') +
			_this.infoData.messageLog;
		}

		$log.debug('sending message', _this.infoData.message);
		ChatSocket.emit('message', _this.infoData.nickName, _this.infoData.message);
		$log.debug('message sent', _this.infoData.message);
		_this.infoData.message = '';
	};

	_this.createRoom = function (roomname) {

		ChatSocket.emit('createRoom', roomname);
	};

	_this.joinRoom = function (roomname) {

		ChatSocket.emit('joinRoom', roomname);
	};

	$scope.$on('socket:broadcast', function (event, data) {
		$log.debug('got a message', event.name);
		if (!data.payload) {
			$log.error('invalid message', 'event', event,
				'data', JSON.stringify(data));
			return;
		}
		$scope.$apply(function () {
			_this.infoData.messageLog = messageFormatter(
				new Date(), data.source,
				data.payload) + $scope.messageLog;
		});

	});

}
SocketController.$inject = ["$log", "$scope", "ChatSocket", "messageFormatter", "nickName"];;

angular.module('kbyteApp')
	.controller('SocketController', SocketController)
	.value('messageFormatter', function (date, nick, message) {
		return date.toLocaleTimeString() + ' - ' +
			nick + ' - ' +
			message + '\n';
	});

module.exports = SocketController;
},{}],8:[function(require,module,exports){
// chaining instead or var; give app name then app dependencies inside array brackets


var angularInit = (function(){

	angular.module('kbyteApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'geolocation', 'btford.socket-io'])
	.value('nickName', 'anonymous');


	angular.module('kbyteApp')
		.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {

			$urlRouterProvider.otherwise('/home');

			// Now set up the states
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'views/home.html'
				})
				.state('comms', {
					url: '/comms',
					templateUrl: 'views/comms.html'
				})
				.state('formz', {
					url: '/formz',
					templateUrl: 'views/formz.html'
				})
				.state('kmaps', {
					url: '/kmaps',
					templateUrl: 'views/kmaps.html'
				})
				.state('kmapquery', {
					url: '/kmapquery',
					templateUrl: 'views/kmapquery.html'
				})

		}]);

})();


module.exports = angularInit;






},{}],9:[function(require,module,exports){
'use strict';

/* @ngInject */
function MapService($q, $rootScope, ContentApis){

	// Service our factory will return
	var googleMapService = {};
	var LocationInfo = ContentApis;

	// Array of locations obtained from API calls
	var locations = [];

	var lastMarker;
	var currentSelectedMarker;
	var icon;

	// Hello Akron
	var selectedLat = 40.41;
	var selectedLong = -81.35;

	// Handling Clicks and location selection
	googleMapService.clickLat  = 0;
	googleMapService.clickLong = 0;

	// Refresh the Map with new data. Function will take new latitude and longitude coordinates.
	googleMapService.refresh = function(latitude, longitude, filteredResults) {

		// Clears the holding array of locations
		locations = [];

		console.log(" MapService Activated  " + latitude);

		// Set the selected lat and long equal to the ones provided on the refresh() call
		selectedLat = latitude;
		selectedLong = longitude;

		if (filteredResults) {

			// Then convert the filtered results into map points.
			locations = convertToMapPoints(filteredResults);

			// Then, initialize the map -- noting that a filter was used (to mark icons yellow)
			initialize(latitude, longitude, true);
		} else {
			// Perform an AJAX call to get all of the records in the db.
			LocationInfo.retrieveLocations()
				.success(function (response) {

					// Convert the results into Google Map Format
					locations = convertToMapPoints(response);

					// Then initialize the map.
					initialize(latitude, longitude, false);
				})
				.error(function (err) {
					console.log(" oopsy we pooped the bed " + err);
				});
		}
	};

	// Private Inner Functions
	// --------------------------------------------------------------
	// Convert a JSON of users into map points
	var convertToMapPoints = function(response){

		// Clear the locations holder
		var locations = [];

		// Loop through all of the JSON entries provided in the response
		for(var i= 0; i < response.length; i++) {
			var user = response[i];

			// Create popup windows for each record
			var  contentString =
				'<p><b>Username</b>: ' + user.username +
				'<br><b>Age</b>: ' + user.age +
				'<br><b>Gender</b>: ' + user.gender +
				'<br><b>Favorite Language</b>: ' + user.favlang +
				'</p>';

			// Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
			locations.push({
				latlon: new google.maps.LatLng(user.location[1], user.location[0]),
				message: new google.maps.InfoWindow({
					content: contentString,
					maxWidth: 320
				}),
				username: user.username,
				gender: user.gender,
				age: user.age,
				favlang: user.favlang
			});
		}
		// location is now an array populated with records in Google Maps format
		return locations;
	};

	// Initializes the map
	var initialize = function(latitude, longitude, filter) {

		// Uses the selected lat, long as starting point
		var myLatLng = {lat: selectedLat, lng: selectedLong};

		// If map has not been created already...
		if (!map){

			// Create a new map and place in the index.html page
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 3,
				center: myLatLng
			});
		}
		if(filter){

			icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
		} else {
			icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
		}
		// Loop through each location in the array and place a marker
		locations.forEach(function(n, i){
			var marker = new google.maps.Marker({
				position: n.latlon,
				map: map,
				title: "Big Map",
				icon: icon,
			});

			// For each marker created, add a listener that checks for clicks
			google.maps.event.addListener(marker, 'click', function(e){
				console.log(" google maps add listener "+e);
				// When clicked, open the selected marker's message
				currentSelectedMarker = n;
				n.message.open(map, marker);
			});
		});

		// Set initial location as a bouncing red marker
		var initialLocation = new google.maps.LatLng(latitude, longitude);
		var marker = new google.maps.Marker({
			position: initialLocation,
			animation: google.maps.Animation.BOUNCE,
			map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
		});
		lastMarker = marker;

		// Function for moving to a selected location
		map.panTo(new google.maps.LatLng(latitude, longitude));

		// Clicking on the Map moves the bouncing red marker
		google.maps.event.addListener(map, 'click', function(e){
			var marker = new google.maps.Marker({
				position: e.latLng,
				animation: google.maps.Animation.BOUNCE,
				map: map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			});

			// When a new spot is selected, delete the old red bouncing marker
			if(lastMarker){
				lastMarker.setMap(null);
			}

			// Create a new red bouncing marker and move to it
			lastMarker = marker;
			map.panTo(marker.position);

			// Update Broadcasted Variable (lets the panels know to change their lat, long values)
			googleMapService.clickLat = marker.getPosition().lat();
			googleMapService.clickLong = marker.getPosition().lng();
			$rootScope.$broadcast("mapclicked");
		});

	};

// Refresh the page upon window load. Use the initial latitude and longitude
	google.maps.event.addDomListener(window, 'load',
		googleMapService.refresh(selectedLat, selectedLong));

	return googleMapService;

}
MapService.$inject = ["$q", "$rootScope", "ContentApis"];

angular.module('kbyteApp')
	.factory('MapService', MapService);

module.exports = MapService;
},{}],10:[function(require,module,exports){
/**
 * Created by kellysmith on 2/22/16.
 *
 * 2014 pokingBears.com
 */
'use strict';
var ChatSocket =  function (socketFactory) {
	console.log(' is there a socket factory avail ');
	var socket = socketFactory();
	socket.forward('broadcast');
	return socket;
};
ChatSocket.$inject = ["socketFactory"];

angular.module('kbyteApp')
	.factory('ChatSocket', ChatSocket);

module.exports = ChatSocket;
},{}],11:[function(require,module,exports){

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

		var entryVar = " booty call of duty ";

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
ContentApis.$inject = ["$q", "$http"];

angular.module('kbyteApp')
	.factory('ContentApis', ContentApis);


module.exports = ContentApis;


},{}]},{},[1]);
