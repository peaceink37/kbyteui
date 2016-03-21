/**
 * Created by kellysmith on 3/9/16.
 *
 * 2016 pokingBears.com
 */

describe('development or production domain', function(){

	var localDomain = "http://localhost:3000/";
	var remoteDomain = "http://kbytedesign.com/";

	for(var thing in window.angular.module){
		console.log(" window angular is an object "+thing);
	}

	beforeEach(function(){
		module('ContentApis');
		module(function ($provide) {
			$provide.value('ContentApis', ContentApis);
		});

	});

	it('should be local then remote', function(){
		expect("http://localhost:3000/").toEqual(localDomain);
		expect("http://kbytedesign.com/").toEqual(remoteDomain);
	});



});

describe('properly formatted user object is sent to server for processing', function(){

	var httpBackend;
	var url;
	beforeEach(inject(function ($httpBackend){
		url = "/users/uentries";
		httpBackend = $httpBackend;
		httpBackend.when("GET", url).respond(200, [{'name':'john',"_id":"1223344","body":"stuff that was typed" },
			{'name':'john2',"_id":"1333355","body":"stuff that was typed two" },
			{'name':'john3',"_id":"2334466","body":"stuff that was typed three" }])

	}));

	it(' should GET user entries', inject(function($http) {

		var response;
		var rstatus = 0;
		successCallback = jasmine.createSpy();
		// Call http service
		$http.get(url).success(function(data, status, headers, config){

			response = data;
			rstatus = status;

		});

		// callback called only after flush
		expect(successCallback).not.toHaveBeenCalled();

		httpBackend.flush();

		expect(response.length).toEqual(3);
		expect(response[1].name).toBe('john2');
		expect(rstatus).toBe(200);

	}));



});

describe(' properly structured json response is avail to controller', function(){
	var scope;
	beforeEach(inject(function($rootScope, $controller){

		scope = $rootScope.$new();
	}))

});


describe(' the almighty fizz buzz', function(){

	
	it(' should return proper modulo values', (function() {	
		
			var value = 0;

			for(var i = 1; i<101; i++){

				value = i;
				
				if(i % 3 === 0 && i % 5 === 0){
					value = "FizzBuzz";
					expect(i % 3).toEqual(0);
					expect(i % 5).toEqual(0);
				
				} else if (i%3 === 0){
					value = "Fizz";
					expect(i % 3).toEqual(0);
					
				} else if (i % 5 === 0){
					value = "Buzz";
					expect(i % 5).toEqual(0);
					
				} else {
					//console.log(value);
				}

				console.log(value)
					
			}
	
		console.log(" foo bar we ");

	}));

});

describe(' test string and array method ', function(){


	var sampleJson = {'entries':[{'name':'bob','age':'33'},{'name':'fred','age':'42'},{'name':'george', 'age':'21'}],'umeta':{'id':'331'}};

	var pullArr = sampleJson.entries;

	function arrSorter(a,b){

		if(a.age > b.age){
			return 1;
		} else {
			return -1;
		}
	}

	pullArr.sort(arrSorter);

	for(var i = 0; i<pullArr.length; i++){
		console.log(" num wheels ARR "+pullArr[i].age);
	}

	for (var thing in sampleJson.entries ){
		console.log(" thing name "+sampleJson.entries[thing].name);
	}

});





