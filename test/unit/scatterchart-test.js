/**
 * Created by kellysmith on 4/11/16.
 *
 * 2016 pokingBears.com
 */


describe('my scatter-chart', function() {
	/* Here goes the code for the test suite */
	var elm, scope, compile, data;

	beforeEach(module('kbyteApp'));

	beforeEach(inject(function($rootScope, $compile){
		elm = angular.element('<scatter-chart class="data-visual" data="data"></scatter-chart>');

		scope = $rootScope.$new();
		scope.data=[];
		$compile(elm)(scope);
		scope.$digest();
	}))

	it(' should see the directive element ', function(){

       	svg = elm.find('svg');
		expect(svg.length).toBe(1);

	})

	it('should create containers for data and axis', function() {
		var groups = elm.find('svg').find('g');

		expect(groups.length).toBe(3);
		elm = null;
	});

	/* test/spec/chart.spec.js */
	it('should create a data point', function() {
		var circles = elm.find('svg').find('circle');
		expect(circles.length).toBe(0);

		scope.data.push({
			time: (new Date('2014-01-01 00:00:00')).toString(), visitors:3
		});
		scope.$digest();

		circles = elm.find('svg').find('circle');
		expect(circles.length).toBe(1);
	});



});
