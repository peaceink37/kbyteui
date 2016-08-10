// chaining instead or var; give app name then app dependencies inside array brackets


function angularInit(){

	angular.module('kbyteApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'geolocation', 'btford.socket-io'])
	.value('nickName', 'kelly');


	angular.module('kbyteApp')
		.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

			//$httpProvider.interceptors.push('AuthInterceptor');

			$urlRouterProvider.otherwise('/home');

			// Now set up the states
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'views/home.html',
					controller: 'HomeController',
					controllerAs: 'home'

				})
				.state('comms', {
					url: '/comms',
					templateUrl: 'views/comms.html',
					controller: 'CommController',
					controllerAs: 'comms',
					resolve:{
						commApiResult: function(ContentApis){
							return ContentApis.getEntry();
						}
					}
				})
				.state('charts',{
					url:'/charts',
					templateUrl:'views/charts.html',
					controller:'ChartsController',
					controllerAs:'scharts'
				})
				.state('formz', {
					url: '/formz',
					templateUrl: 'views/formz.html',
					controller: 'BlogController',
					controllerAs: 'formz',
				})
				.state('kmaps', {
					url: '/kmaps',
					templateUrl: 'views/kmaps.html'
				})
				.state('kmapquery', {
					url: '/kmapquery',
					templateUrl: 'views/kmapquery.html'
				})

		}).run(function(ContentApis, UserAuthService){

		});

};
angularInit();

module.exports = angularInit;





