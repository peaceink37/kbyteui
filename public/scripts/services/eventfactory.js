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
		$rootScope.$emit(eventName, data);
	};

	return {
		subscribe: subscribe,
		broadcast: broadcast
	};
};

angular.module('kbyteApp').factory('EventFactory', EventFactory);

module.exports = EventFactory;

