/**
 * Created by kellysmith on 4/6/16.
 *
 * 2016 pokingBears.com
 */

describe(' stat methods should find sum, mean, min, and max of list ', function(){

	var testList = [4,66,12,3,44,8,5,22,41];

	var permuteIdx = [3,3,6,6,7,7,2,2,2,2,1,1,0,1,3,3,4,4,5,5,6,6];

	it('should return the mean value of the list ', function(){

		console.log(' d3 min function ',d3.mean(testList));

	});

	it('should return the mean value of the list ', function(){

		var sortedList = testList.sort(function(a,b){

				// for ascending values
				if(a > b){
					return 1;
				} else {
					return -1;
				}
		})


		console.log(' sorted list then median  ',d3.median(sortedList)+' and sorted '+sortedList);

	});

	it('should permute the values to the indicated indexies value of the list ', function(){

        console.log(' permutation my friends ',d3.permute(testList, permuteIdx));
	});

	it(' should generate a range of values as such ', function(){

			// Generate a range from 0 to 5
			console.log(d3.range(5));

			// Generate a range from 10 to 20 with a step of n
			console.log(d3.range(10, 20, 2));

			// Generate a range from 10 to 0
			console.log(d3.range(10, 0, -2));
			// [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]


	})


})

describe(' d3 next operator should predictably manipulate data structures ', function(){

	var values = [
		{n: 'Peter', age: 25, gender: 'male', eyes: 'brown'},
		{n: 'Linda', age: 22, gender: 'female', eyes: 'brown'},
		{n: 'Susi', age: 28, gender: 'female', eyes: 'blue'},
		{n: 'Hans', age: 36, gender: 'male', eyes: 'green'},
		{n: 'Carine', age: 42, gender: 'female', eyes: 'brown'},
		{n: 'Fred', age: 47, gender: 'male', eyes: 'brown'},
		{n: 'Philipp', age: 19, gender: 'male', eyes: 'brown'},
		{n: 'Flo', age: 34, gender: 'female', eyes: 'blue'}
	];

	it(' should sort values first by gender ', function(){

		var sortedValues = d3.nest()
			// Group by property gender (male, female) on 1. level
			.key(function(d) { return d.gender; })
			// Sort 1. level keys with descending order
			.sortKeys(d3.descending)
			// Group by property ages (10, 20, 30, 40, 50) on 2. level
			.key(function(d) { return Math.floor(d.age / 10) * 10; })
			// Sort 2. level keys with ascending order
			.sortKeys(d3.ascending)
			// Add the dataset
			.entries(values);

		console.log(' sorted values via nest '+sortedValues['male']+sortedValues['female']);

	})


})

/*
 * Scales
 * They can be linear, power, logarithmic, etc.
 *
 * */

describe(' use a d3 scale object to map a data set ', function(){


	// init scale object
	var scale = d3.scale.linear()
		.domain([0,10])
		.range([0,100]);

	var dataSet = [1,3,5,7,9,10];
	var ordDataSet = ['adam','bob','frank','fred'];

	it(' maps a data set', function(){
		  console.log(' the mapped set ',dataSet.map(scale)+"  with ticks "+scale.ticks(6));
	})
	
	it(' it uses an ordinal scale for discreet data ',function(){
		var oscale = d3.scale.ordinal()
			.domain(['A', 'B', 'C', 'D', 'E', 'F'])
			.range([0, 1, 2, 3, 4, 5])

		console.log(' ordinal data set ',ordDataSet.map(oscale));
		console.log(' math random to fixed '+Math.random().toFixed(2));

	})

	
})

describe(' d3-centric log parser ', function(){

	var elm, scope, parser, logString;

	beforeEach(module('kbyteApp'));

	beforeEach(inject(function(StringParser){

		parser = StringParser;
		logString = '66.249.64.121 - - [22/Nov/2014:01:56:00 +0100] "GET /robots.txt HTTP/1.1" 302 507 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"';


	}));

	it('should parse the data', function() {
		var parsed = parser(logString);
		var mapped = parsed.map(function(d) {
			return {
				ip: d[0], time: d[2], request: d[3], status: d[4], agent: d[8]
			};
		})
		expect(mapped[0].ip).toBe('66.249.64.121');
		expect(mapped[0].time).toBe('22/Nov/2014:01:56:00 +0100');
		expect(mapped[0].request).toBe('GET /robots.txt HTTP/1.1');
		expect(mapped[0].agent).toBe('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
		expect(mapped[0].status).toBe('302 507');
	});
});





