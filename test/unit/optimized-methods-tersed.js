/**
 * Created by kellysmith on 3/24/16.
 *
 * 2016 pokingBears.com
 */

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
		console.log(' num wheels ARR '+pullArr[i].age);
	}

	for (var thing in sampleJson.entries ){
		console.log(' thing name '+sampleJson.entries[thing].name);
	}

});

describe(' the almighty fizz buzz', function(){


	it(' should return proper modulo values', (function() {

		var value = 0;

		for(var i = 1; i<101; i++){

			value = i;

			if(i % 3 === 0 && i % 5 === 0){
				value = 'FizzBuzz';
				expect(i % 3).toEqual(0);
				expect(i % 5).toEqual(0);

			} else if (i%3 === 0){
				value = 'Fizz';
				expect(i % 3).toEqual(0);

			} else if (i % 5 === 0){
				value = 'Buzz';
				expect(i % 5).toEqual(0);

			} else {
				//console.log(value);
			}

		}

	}));

});

describe(' reverse an array in place ', function(){

	var testArray = [4,23,66,1,32,12,3,6];

	function filterFunction(arrVal){

		if(typeof arrVal === 'string'){

			return arrVal;
		}
	}

	it('array should return in reversed order using half-length', function(){

		var right = null;
		var left = null;
		var length = testArray.length;

		for(left=0; left < length /2; left +=1){

			right = length-1-left;
			var temp = testArray[left];
			testArray[left] = testArray[right];
			testArray[right] = temp;
			//console.log(' temp '+temp+'  right  '+right+' left  '+left);
		}

		var concatArray = testArray.concat(['willie','tom',2112]);
		var filterArray = concatArray.filter(filterFunction)
		//console.log('  concat array '+concatArray+'  test array after reverse '+testArray+' filter array '+filterArray);

	});

	it(' array should return in reversed order using full-length ', function(){

		var right = null;
		var left = null;
		var length = testArray.length;

		for(left = 0, right = length-1; left<right; left += 1, right -= 1){

			var temp = testArray[left];
			testArray[left] = testArray[right];
			testArray[right] = temp;
		}

		//console.log(' array reverse full length method '+testArray);

	});



})

describe(' filter an array of object by indexOf ', function(){

	var objArray = [{'name':'bomar', 'id':'1'},{'name':'roger', 'id':'2'},{'name':'doug', 'id':'3'}]

	var objMap = new Object();
	var fakeJson = {'people':[{'name':'bomar', 'id':'1'},{'name':'roger', 'id':'2'},{'name':'doug', 'id':'3'}],
		'places':[{'city':'rome', 'nation':'Italy'},{'city':'Detroit', 'nation':'Merica', 'city':'Tokyo','nation':'Japan'}]}


	function filterObj(obj, index){

		if(obj.name === 'doug'){
			expect(obj.name).toEqual('doug');
			return obj;
		}
	}

	it(' should filter obj array by name and return that object ', function(){

		var nameObj = objArray.filter(filterObj);

		for( blah in nameObj){
			console.log(' nameObj jj '+nameObj[0]+'  blah  '+blah);
			expect(nameObj[blah].name).toBe('doug');
		}

		for (i = 0; i < objArray.length; i++){
			makeMap(objArray[i].name, objArray[i].id)
		}

		function makeMap(name, id){
			objMap[id] = name;
			console.log(objMap);

		}


		var personuno = {name:'green', age:'big', city:'flint'};
		function updatePerson(name, age, city){
			this.name = name;
			this.age = age;
			this.city = city;
		}

		var dispatch = function(person, method, args){

			method.apply(person, args);
		};

		dispatch(personuno, updatePerson, ['billy','43','detroit']),

		console.log(' person uno '+personuno.name);

	})

})

describe(' do an range and sum / reduce operation ', function(){

	it(' should include every number in the range', function(){

		var range = [1,11];
		var filledRange = [];
		var reduced = 0;

		for(var i = 0; i<range[1]; i++){

			if((i+1)%2 !== 0){
				filledRange.push(i+1);
			}


			reduced = reduced + (i+1);

			console.log(' filled range '+filledRange+'  reduced '+reduced+' mod i  '+(i%2));
		}

	})
})

describe(' it should be an object list ', function(){

	it(' write an array to list ', function(){

		var lArray = [2,4,6,8,10,20,40,80];
		var last = false;


		function arrayToList(arr){

			var templist = null;

			for(i=arr.length-1; i>=0; i--){

				templist = {value:arr[i], rest:templist};

			}

			return templist;

		}

		//var list = arrayToList(lArray);

		console.log(arrayToList(lArray));

		function processArray(elem){

			if(elem > 20){
				console.log(' boom big number '+elem);
			}
		}

		lArray.forEach(processArray);



	})

});

describe(' call methods to change scope ', function(){

	var unit1 = {name:'Marvin', age:42, size:'XXL'};
	var unit2 = {name:'Zaphod', age:66, size:'XS'};

	it('should shift scope to calling object',function(){

		console.log(' unit 1 HI '+unit1.name);

		function update(name, age, size){
			this.name = name;
			this.age = age;
			this.size = size;
		};

		// arguments must match
		update.call(unit1, 'Jimmy', 52, 'L');

		console.log(' unit 1 '+unit1.name);
	})

});

describe(' apply method to change scope w argument array ', function(){

	var thingy1 = {name:'scat', age:'55', home:'Flint'};

	it('should shift scope to applying object',function(){

		var args = ['derwood', '14', 'Berlin'];

		function update(name, age, size){
			this.name = name;
			this.age = age;
			this.home = size;
		};

	   	update.apply(thingy1, args);

		console.log('  thingy1  '+thingy1.name+'   '+thingy1.home);
	});

});

describe(' use spread operator to flatten array args ', function(){

	var aNumbers = [2,5,4,4,3];
	var unit1 = {name:'Marvin', age:42, size:'XXL'};

	it('should shift scope to applying object',function() {
		function flatNums(bers){


			var flatA = bers.reduce(function(prev, curr, idx){

				return prev + curr;
			});
			console.log(' aNumbers ' + flatA);

		}

		function sliceArgList(){
			return Array.prototype.slice.call(arguments);
		}

		var list1 = sliceArgList(2,4,6);
		
		console.log(' list1 '+list1.length+' type of list ',typeof list1);

		flatNums(aNumbers);
	});
})

describe(' returning inner functions ', function(){

	it(' should return content of inner function', function(){
		var monkeyShines = 'wowo wowo';
		function mainFunction() {

			function subFunction() {
				var str = 'foo';
				var surly = 'for sure';
				return str;
			}
			return subFunction();
		}

		var test = mainFunction();
		console.log('  test inner function '+test+'  monkey s '+monkeyShines);

	});
});

describe(' array mapping ', function(){

	it(' should reformat objects ', function(){
		var kvArray = [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}];
		var reformattedArray = kvArray.map(function(obj){
			var rObj = {};
			rObj[obj.key] = obj.value;
			return rObj;
		});
	// reformattedArray is now [{1:10}, {2:20}, {3:30}],
	// kvArray is still [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}]

		var numbers = [1, 4, 9];
		var roots = numbers.map(Math.sqrt);
		// roots is now [1, 2, 3], numbers is still [1, 4, 9]
		tempArray = [];
		function processElements(element, idx){

			if(element > n){
				tempArray.push(element);
			}
		};

	});

});

describe(' array data manipulation - sorting slicing ', function(){

	//var sortingArr = [4,3,66,24,51,5,68];
	var sortingArr = ['jim','bob','frank','susie','joan','mable'];
	var n = 3;

	//largest(1, [2,3,4]) == 4;
	//largest(2, [2,5,7]) == 5,7;

	it(' should sort from low to hi and slice from hi ', function() {

		var newList;

		function largest(n, list) {

			var tempList = list.sort(function (a, b) {
				// makes values low to hi
				if (a > b) {
					return 1;
				} else {
					return -1;
				}
			})

			newList = tempList.slice(-n);
			console.log(' newList ' + newList + ' ccc templist length ' + tempList.length);
		}

		largest(n, sortingArr);
	});


});

describe(' nested function returns ', function(){

	   it(' returns nested values ', function(){

		       var complicated = function(x){
			       console.log(' complicated x var '+x);
			       var ya = 1;
			       var foo = function(){

				       ya += ya*x+1;
				       //return ya;
				       console.log(' xx complicated ya var '+ya);

				       if(ya < 100){
					       foo(x)
				       } else {
					       console.log(' else value for ya '+ya);
					       return ya;
				       }

			       }

			       foo(x);
			       //return foo(foo(foo(x)));
		       }

		   console.log(' complicated nested function  '+complicated(3))
	   })

});

describe(' reduce an array ', function(){

	var array1 = [2,5,8,11,22];
	var aResult;

	it(' returns reduced value from left to right - prev + curr ', function(){

		function reduceThat(prev, next, idx){

			aResult = prev+next;
			return aResult;

		}

		var reduceThisAr = array1.reduce(reduceThat);

		console.log(' classic reduce value reduceThisAr '+reduceThisAr);
	})

})


describe(' map object values / or keys into an array ', function(){

	var uidNameObj = [{uid:1, name:'John McLain'},{uid:2, name:'Fred Savage'},{uid:3, name:'Gus Fring'}]

	it(' returns an array of name values from the object ', function(){

		function mapMethod(obj){

			var returnObj = {};
			returnObj[obj.uid] = obj.name;
			return returnObj;
		}

		var nameList = uidNameObj.map(mapMethod);

		console.log(' object map name list ',nameList[2]);

		for(foo in nameList){
			value = nameList[foo];
			console.log(' foo in namelist ',value[foo]);
		}

	})

})

describe(' functional javascript tutes ', function(){

	it(' takes an string input and makes it all upper case ',function(){

		var inputString = 'This is estranga';

		function upperCaseMaker(input){

			return input.toUpperCase();
		}

		var upperString = upperCaseMaker(inputString);
		console.log(' uppercase '+upperString);
	})

	it(' creates a map instead of a loop ',function(){

		var aNumbers = [2,4,6,3,7,4,2,8,2,7,7,1,2,8,2,7]

		var mapNums = aNumbers.map(function(num){

			var newNum = num*2;

			return newNum;


		}).sort(function(a,b){
			// if true, return == -1 is large to small and return == 1 is small to large
			if(a > b){
				return -1;
			} else {
				return 1;
			}
		})
		console.log(' map numberes '+mapNums);

	})

	it(' this excersize ', function(){
		// this is always set by the calling method slash function


		function containerTray(){

			this.stu = 0;

			return function inside(){

				this.stu = 12;
				return this.stu;
			}

			//containerTrayTwo.call(this, 6)

			

		}

		function containerTrayTwo(val){

			this.stu = val;
		}	
		
		var stuVal = containerTray();
		console.log(' value of Stu '+stuVal);



	})

	it(' combining array into one data object ',function(){

		var cities1 = ['Dubai', 'San Francisco', 'Detroit', 'Boston'];
		var cityStats = [{'loc':'26.0', 'temp':'101'},{'loc':'39.5', 'temp':'66'},{'loc':'44.5','temp':'41'},{'loc':'41.0','temp':'28'}]
		var i = 0;
		var newStats = cityStats.map(function(obj){

			var newObj = {};
			newObj.loc = obj.loc;
			console.log(" object loc "+obj.loc);
			newObj.temp = obj.temp;
			newObj['city'] = cities1[i];
			i++;
			return newObj;
			
		}).filter(function(obj){

			if(obj.city !== 'Detroit'){
				return obj;
			}

		});

		// remove exclusions from intSet then sort
		var intSet = [8,2,3,11,5,6,7,1,9,10,4,12,13];
		var exclusionSet = [8,2,7];

		var newInts = intSet.filter(function(num){

			if(exclusionSet.indexOf(num) === -1){
				return num;	
			}

			
		}).sort(function(a,b){

			if(a < b){
				return -1;
			} else {
				return 1;
			}
		})
		console.log(' new stats '+newStats[0].city+' new stats object '+newStats+'  '+cityStats+'  new ints  '+newInts);

	})

	it(' concats a few strings ', function(){

		var str1 = 'Grendal has mother issues\n But don\'t we all\n';
		var str2 = 'The Compsons were on fugged up Southern family \n but not quite as bad as the Mansons \n';
		var strArray = [str1,str2];
		var bookObj = {set1:[{'book':'The Sound And The Fury', 'id':1},{'book':'Beowulf','id':2}], set2:[{}]};
		
		console.log('  bookObj  '+bookObj['set1'][0]['book']);

		newBookObj = bookObj.set1.map(function(obj){

			var nObj = {}
			nObj.id = obj.id;
			nObj.book = obj.book;
			nObj.tag = strArray[obj.id-1];

			return nObj;

		})

		console.log(' new book object '+newBookObj[0].tag);

	})

	it(' performs second level sorts ', function(){


		var sortArr = ['Grinch','add','Ask','gripe','grovel','attack','football-face'];

		var weSorted = sortArr.sort(function(a,b){

			
			console.log(" a and b "+a+"  "+b);
			var aCompare = a.charAt(0).toLowerCase();
			var bCompare = b.charAt(0).toLowerCase();
			if( aCompare > bCompare){
				console.log(" true for first char comparison "+aCompare+"   "+bCompare);
				//var aaCompare = a.charAt(1).toLowerCase();
				//var bbCompare = b.charAt(1).toLowerCase(); 
				//if(aaCompare > bbCompare){
				//	console.log(" true for second char comparison "+a.charAt(1)+"   "+b.charAt(1)); 
					return 1;
				//} else {
				//	return 0;	
				//}
				
			} else if (a.charAt(0) == b.charAt(0)){
				return 0;	
			} else {
				return -1;
			}
		})

		console.log(" we sorted "+weSorted); 

		var revString = "reversebitch";

		function reverseIt(s){

			var rs = [];
			
			for(var i = s.length -1; i >= 0; i-- ){

				rs.push(s.charAt(i));

			}

			var revStr = rs.join("");
			return revStr;
		}

		var reversedString = reverseIt(revString);

		console.log(" reversed string "+reversedString);

	})

});

describe(' example of closures ', function(){


	it(' shows how local variables are held ', function(){


		function countToSomething(num){


			var n = num || 44;
			console.log('  called !! '+n);
			return function uptick(){

				console.log('  this is n '+n);
				n++;
				if (n > 50){
					n = 7;
				}
				return n;
				
			}
		
		}

		var doodoo = countToSomething();
		var doodoo2 = countToSomething(66);

		for(var i=0; i<10; i++){
			doodoo();
			doodoo2();	
		}

		console.log(' val of doo doo '+doodoo());
		console.log(' val of doo doo again '+doodoo());

		function daDarth(){

			var storeVal = null;
		
			return darthObj = {
				
				setVal:function(val){
					storeVal = val;
				},
				getVal:function(){
					return storeVal;
				}	
			}
		
		}

		var stoopid = daDarth();
			stoopid.setVal(22);
		var stoopid2 = daDarth();
			stoopid2.setVal(26);

			console.log(stoopid.getVal(),"   ",stoopid2.getVal(),"  ",stoopid.storeVal);


		
				
		
	})

})

describe(' more about closures, array like objects, and food', function(){


	it(' using array value that came in as array like', function(){

		function deezHomies(){
			
			var argArr = Array.prototype.slice.call(arguments);

			for(zoop in arguments){
				console.log(' zoop arguments  '+arguments[zoop]);
			}

			return function(arg){
				console.log(' return function called '+arg);
				return argArr[1] + arg;
			}
		}

		function dosHomies(){

			var nippy = 'hopper', myargs = Array.prototype.slice.call(arguments);

			return function(one, two){

				var daVal = myargs.filter(function(val){

					if(val.indexOf('dr.') != -1){
						return val;
					}

				})

				return {

					getGrinch:function(){
						return daVal;
					},
					setGrinch:function(sval){
						daVal = sval;

					}

				}
				//return one+nippy+' that right '+two+'  '+daVal;
			}
		}

		// tripping will hold the values of deezhomies
		var tripping = deezHomies(6,32,2);
		var gonzo = tripping(15);

		var semi = dosHomies('fool','dr.lovestone');
		var grogshop = semi('papa','funky');
		grogshop.setGrinch('mean one');
		var newboo = grogshop.getGrinch();
		console.log('   gonzo return  ',gonzo,'   semi  ',semi,'  grogshop ',grogshop+'  new boo '+newboo);


	})


})

describe(' arrow functions with array manipulation ',()=>{

	var tooty = {'player1':'tommy','player2':'lonny','player3':'freddy'};

	it(' uses an arrow function and a map ',()=>{;

		var players = [1,2,3];

		var playerInfo = players.map((value)=>{

			var newObj = {};
				newObj['player'+value] = tooty['player'+value];
				return newObj;
		})

		console.log('  arrow function map '+playerInfo);
	})
})











