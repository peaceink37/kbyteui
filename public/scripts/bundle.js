(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./main');
require('./controllers/homecontroller');
require('./controllers/navcontroller');
require('./controllers/commcontroller');
require('./controllers/blogcontroller');
require('./controllers/socketcontroller');
require('./controllers/mapcontroller');
require('./directives/editorelement');
require('./controllers/htmleditcontroller');
require('./controllers/modalcontroller');
require('./controllers/logincontroller');


require('./services/editorservice');
require('./services/eventfactory');
require('./services/modalscopeservice');
require('./services/userapiservice');
require('./services/mapservice');
require('./services/socketservice');

},{"./controllers/blogcontroller":2,"./controllers/commcontroller":3,"./controllers/homecontroller":4,"./controllers/htmleditcontroller":5,"./controllers/logincontroller":6,"./controllers/mapcontroller":7,"./controllers/modalcontroller":8,"./controllers/navcontroller":9,"./controllers/socketcontroller":10,"./directives/editorelement":11,"./main":12,"./services/editorservice":13,"./services/eventfactory":14,"./services/mapservice":15,"./services/modalscopeservice":16,"./services/socketservice":17,"./services/userapiservice":18}],2:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */
'use strict'

function BlogController($state, $q, $sce, ContentApis) {

	var UserInfo = ContentApis;
	var _this = this;

	_this.submit = false;
    _this.setEntryMessage = "We'll see how it goes."
	_this.formInfo = {};
	_this.userIdChange = "";
	_this.formInfo.title = " da book of mack ";
	_this.formInfo.comments = " don't hurt em hammer ";
	_this.formInfo.bodyBooty = " blah blah doop ";
	_this.formInfo.hidden = false;
	_this.formInfo.userComments = [];
	_this.formInfo.userName = "Kelly";


	_this.submitUserEntry = function () {

		if(_this.submit === false){
			return;
		} else {
			_this.submit = false;
		}

		_this.formInfo.userId = "1234";
		//_this.userIdChange;

		var entryMessage = "";

		_this.formInfo.comments = $(".content-entry").html();

		UserInfo.setEntry(_this.formInfo)

			.success(function (data) {
				if (data.Result === true) {
					entryMessage = "Well, this thing worked.";
					_this.retreiveUserEntries();
				} else {
					entryMessage = "Something bad happened on the validation side";
				}
				setEntryMessage(entryMessage);
				$(".content-entry").empty();
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
			.then(function (data) {
				angular.forEach(data, function (v, k) {
					//console.log(" retrieve com  " + data[k].uid + "  " + data[k]+"  "+v);
					var userAndComment = {};
					userAndComment.user = data[k].uid;
					var textToHtml;

					try{ textToHtml = data[k].comments.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");}
					catch(err){
						textToHtml = err.message;
					}

					userAndComment.comment = textToHtml;
					//console.log(" textToHTML var " + textToHtml);
					_this.formInfo.userComments.push(userAndComment);

				})
				// put all the comments into an array and then join them up

			})

	};

	_this.retreiveUserEntries();
};

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

	if(_this.commApiResult.message.indexOf('message') != -1){
		_this.commApiResult = 'The Aqua Teens Love You';
	}

	function getStringOut() {

		var theString = "We selected this video especially for you";
		_this.stringOut = theString.substr(0, theString.length);
	};

	getStringOut();
};

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
};


angular.module('kbyteApp')
	.controller('HomeController', HomeController);



module.exports = HomeController;
},{}],5:[function(require,module,exports){
/**
 * Created by kellysmith on 3/18/16.
 *
 * 2016 pokingBears.com
 */

'use strict';

/* @ngInject */
function HtmlEditController ($scope, EventFactory, EditorService){

	var _this = this;
	var currentElement;

	// TODO find out why this is having issues being bound
	// to _this
	$scope.htmlelements=["h1","h4","p"];


	// The _this binding is working fine here
	_this.setElement = function(elementValue){
		console.log(" element value "+elementValue);
		EventFactory.emit('elementset', elementValue);
	};

}

angular.module('kbyteApp')
	.controller('HtmlEditController', HtmlEditController);


module.exports = HtmlEditController;

},{}],6:[function(require,module,exports){
/**
 * Created by kellysmith on 3/26/16.
 *
 * 2016 pokingBears.com
 */

function LoginController(ContentApis, ModalScopeService, $timeout) {

	var userPassService = ContentApis;

	var parentModalScope = ModalScopeService.getModalScope();

    var _this = this;
	_this.userInfo = {};
	_this.userInfo.email = "me@duh.net";
	_this.userInfo.displayname;
	_this.userInfo.userpass;
	_this.error = null;
	_this.processing = false;
	_this.postProcessing = {};
	_this.postProcessing.status;
	_this.okLabel = "Submit";
	_this.cancelLabel = "Cancel";


	_this.proceed = function() {

		console.log(" proceed be called "+_this.userInfo.displayname+"  pwd  "+_this.userInfo.userpass);
		_this.processing = true;
	    if(_this.userInfo.userpass.length < 6){
		    console.log(" pwd length ",_this.userInfo.userpass.length)
		    return;
	    }

		userPassService.userAuth(_this.userInfo, processResults);

	};

	_this.cancel = function() {
		console.log("  cancel called ");
		parentModalScope.cancel();
	}

	function processResults(resMessage){

		console.log(" res message "+resMessage.message);
		if(resMessage.message === "true"){
			_this.postProcessing.status = "Update Successful";
			$timeout(function(){
				_this.processing = false;
				parentModalScope.cancel();
			},500);

		}

	}

}

angular.module('kbyteApp')
	.controller('LoginController', LoginController);

module.exports = LoginController;

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
/**
 * Created by kellysmith on 3/26/16.
 *
 * 2014 pokingBears.com
 */

function ModalController($scope, $modal, $timeout, EventFactory, ContentApis, ModalScopeService) {

	var userPassService = ContentApis;
    var _this = this;

	var mController;
	var mControllerAs;

	ModalScopeService.setModalScope(_this);

	function raiseModal(){

		console.log(" raise modal function called ");

		var modalInstance = $modal.open({
				templateUrl: 'views/modal_useraccount.html',
				scope:$scope,
				keyboard: true,
				controller:mController,
				controllerAs:mControllerAs,
				bindToController:{
					mControllerAs:'='
				}
	        });

		_this.cancel = function(event) {
			console.log(" cancel in parent clicked ");
			modalInstance.dismiss('cancel');
		};
	};


	EventFactory.subscribe('login-modal',function(e, userInfo){

		console.log("  user info  "+userInfo[1]);

		mController = userInfo[1][0];
		mControllerAs = userInfo[1][1];

		$timeout(function(){
			raiseModal();
		},100)

	});

}

angular.module('kbyteApp')
	.controller('ModalController', ModalController);

module.exports = ModalController;

},{}],9:[function(require,module,exports){
/**
 * Created by kellysmith on 3/9/16.
 *
 * 2014 pokingBears.com
 */

/* @ngInject */
function NavController($state, EventFactory, ContentApis) {

	var _this = this;
	this.navGreeting = 'KByteDesign';
	console.log(" this.navGreeting ", this.navGreeting);
	this.winLocation = window.location.href;

	var userInfoService = ContentApis;

	$("#signin").click(function (e) {
		console.log("  we have clicky poo");
		raiseLoginModal(e);
	})

	function raiseLoginModal(evt) {

		EventFactory.broadcast('login-modal',[evt,["LoginController","loginc"]]);
		console.log(" loginModal raised ");
	};

};

angular.module('kbyteApp')
	.controller('NavController', NavController);

module.exports = NavController;
},{}],10:[function(require,module,exports){
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
	_this.infoData.nickName = 'Kelly';
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

};

angular.module('kbyteApp')
	.controller('SocketController', SocketController)
	.value('messageFormatter', function (date, nick, message) {
		return date.toLocaleTimeString() + ' - ' +
			nick + ' - ' +
			message + '\n';
	});

module.exports = SocketController;
},{}],11:[function(require,module,exports){
/**
 * Created by kellysmith on 3/17/16.
 *
 * 2016 pokingBears.com
 */

function editorElement(EditorService){


	//console.log(" ping the directive ");

	function link(scope){

		//scope.htmlelements = EditorService.getElements();
	}

	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		bindToController:{
			htmlelements:'='
		},
		template:['<button class="btn btn-default" ng-repeat="element in htmlelements" ng-click="htmledit.setElement(element)"><span class="edit-btn-text">{{element}}</span></button>'].join(''),
		link:link

	};

}

function editorCanvas(EventFactory, EditorService, $timeout){

	var canvasElement;
	var elIdx = 0;

	function link(element, attrs, ctrl){

		canvasElement = element;

		EventFactory.subscribe('elementset',function(e, newEl){
			for(poopy in e) {
				console.log(" rip to phife ** forever tribe " + poopy+ "   "+newEl);
			}
			setElement(newEl);
		});
	}

	function setElement(newEl){

		var storedSelections = [];

		var newElement = angular.element("<"+newEl+"></"+newEl+">");
		console.log(" now we be talking "+newElement);

		$('.content-entry').append(newElement);
		var numElString = elIdx.toString();
		var newId = 'el'+numElString;
		$(newElement).attr('id',newId);

		$(newElement).html("\u0001");

		$timeout(function() {
			if(newElement)
				$(newElement).focus()
				var selection = rangy.getSelection();
				var range = rangy.createRange();
				var startNode = document.getElementById(newId);
				range.setStartAfter(startNode);
				range.setEndAfter(startNode);

				//apply this range to the selection object
				selection.removeAllRanges();
				selection.addRange(range);
				elIdx ++;
                //;
				console.log(" focus called "+newElement);
		},20);


		// do rangy stuff

		if(window.getSelection){
			var currentSelection = window.getSelection();
			for(var i = 0; i < currentSelection.rangeCount; i++){
				storedSelections.push(currentSelection.getRangeAt(i));
				console.log("  current selection range count "+currentSelection.getRangeAt(i));
			}
		}

	}


	return {

		restrict:"E",
		replace: true,
		scope:{},
		controller:'HtmlEditController',
		controllerAs:'htmledit',
		template:['<div class="form-group"><div class="content-entry text-background" contenteditable="true" ng-maxlength="1000"></div></div>'].join(''),
		link:link
	};

}

angular.module('kbyteApp')
	.directive("editorElement", editorElement)
	.directive("editorCanvas", editorCanvas);


module.exports = editorElement;
module.exports = editorCanvas;
},{}],12:[function(require,module,exports){
// chaining instead or var; give app name then app dependencies inside array brackets


var angularInit = (function(){

	angular.module('kbyteApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'geolocation', 'btford.socket-io'])
	.value('nickName', 'anonymous');


	angular.module('kbyteApp')
		.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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

		});

})();


module.exports = angularInit;






},{}],13:[function(require,module,exports){
/**
 * Created by kellysmith on 3/18/16.
 *
 * 2016 pokingBears.com
 */

'use strict'

function EditorService ($rootScope){


	this.getElements = function(){

		var htmlelements=[
			"h1",
			"h4",
			"p"
		];

		return htmlelements;

	}


}

angular.module('kbyteApp')
	.service('EditorService', EditorService);
},{}],14:[function(require,module,exports){
/**
 * Created by kellysmith on 3/20/16.
 *
 * 2016 pokingBears.com
 */


function EventFactory($rootScope) {

	var subscribe = function (eventName, callback) {
		return $rootScope.$on(eventName, callback);
	};

	var broadcast = function (eventName, data) {
		$rootScope.$broadcast(eventName, data);
	};

	var emit = function(eventName, data){
		$rootScope.$emit(eventName, data)
	}

	return {
		subscribe: subscribe,
		broadcast: broadcast,
		emit: emit
	};
};

angular.module('kbyteApp').factory('EventFactory', EventFactory);

module.exports = EventFactory;


},{}],15:[function(require,module,exports){
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

angular.module('kbyteApp')
	.factory('MapService', MapService);

module.exports = MapService;
},{}],16:[function(require,module,exports){
/**
 * Created by kellysmith on 3/27/16.
 *
 * 2016 pokingBears.com
 */

function ModalScopeService() {

	var modalScope = {};

	this.setModalScope = function(mScope){
		modalScope = mScope;
	};

	this.getModalScope = function(){
		return modalScope;
	}
}

angular.module('kbyteApp')
	.service('ModalScopeService', ModalScopeService);

module.exports = ModalScopeService;
},{}],17:[function(require,module,exports){
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

angular.module('kbyteApp')
	.factory('ChatSocket', ChatSocket);

module.exports = ChatSocket;
},{}],18:[function(require,module,exports){
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


},{}]},{},[1]);
