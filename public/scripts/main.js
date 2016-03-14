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





