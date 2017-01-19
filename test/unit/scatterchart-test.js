/**
 * Created by kellysmith on 4/11/16.
 *
 * 2016 pokingBears.com
 */


describe('my scatter-chart', function() {
	/* Here goes the code for the test suite */
	
	it(' should map an ordinal scale',function(){


		var scale = d3.scale.ordinal()
		.domain(["a","b","c","d","e","f"])
		.range([0,1,2,3,4,5]);

		console.log(" YO ",["A","B","C"].map(scale));
	})

	it(' should map range points ',function(){

		var scale = d3.scale.ordinal()
		.domain(["a","b","c","d","e","f","g","h","i"])
		.rangePoints([0,100], 0.1);

		console.log(" YO scale ",scale.range());

		console.log(" YO rangepoints ",["a","b","c","g"].map(scale));
	})

	var elm, scope;

	beforeEach(module('kbyteApp'));

	beforeEach(inject(function($rootScope, $compile, $httpBackend){

		elm = angular.element('<scatter-chart class="chart" data="data">' +
			'</scatter-chart');

		scope = $rootScope.$new();
		scope.data = [];
		
		$httpBackend.whenGET("http://kbytedesign.com/ui-visual.conf").respond({ hello: 'World' });
		$httpBackend.expectGET("http://kbytedesign.com/ui-visual.conf");

		$compile(elm)(scope);
		scope.$digest();

	}));

	it(' should create svg parent ', function(){
		
		var svg = elm.find('svg');
		expect(svg.length).toBe(1);
	});

	it(' should create containers for the data and axis ', function(){

		var groups = elm.find('svg').find('g');
		expect(groups.length).toBe(3);

	})



});
