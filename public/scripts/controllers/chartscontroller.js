/**
 * Created by kellysmith on 4/6/16.
 *
 * 2016 pokingBears.com
 */

/* @ngInject */
function ChartsController($scope, ContentApis, $interval, StringParser, Classifier, d3Service){

	// Check out d3 xhr wrapper

	console.log(" hello charts ");
	var logService = ContentApis;
	var _this = this;
	var time = new Date('2015-01-01 00:00:00 +0100');

	var dateFormat = d3Service.time.format("%d/%b/%Y:%H:%M:%S %Z");

	// get logfile and pass callback to process it
	logService.getLog(processLog);

	_this.logs = {

		data:[],
		map:function(d){

			return {
				ip: d[0],
				time: dateFormat.parse(d[2]),
				request: d[3],
				status: d[4],
				agent: d[8]
			};
		},
		groupByMinutes:5
	};

	// Process text file logging format into something usable
	function processLog(data){

		var parsedLines = StringParser(data);

		var mapped = parsedLines.map(_this.logs.map);

		var grouped = Classifier(mapped, function(d){
			var coeff = 1000*60*_this.logs.groupByMinutes;
			return Math.round(d.time / coeff)*coeff;
		})

		_this.logs.data = grouped;
		console.log('PARSED LINES '+parsedLines);

	}




	$interval(function() {
		time.setSeconds(time.getSeconds() + 1);

	}, 2000);

	// Change the fill color of the items
	//items.call(styles({fill: 'red', stroke:'green', 'stroke-width':5}));
	// Remove the element #first-item from the DOM

	function styles(styles){
		return function(selection){
			for(var property in styles){
				selection.style(property, styles[property])
			}
		}
	}

	function experimentalDraw(){

		var svg = d3Service.select('#scales');
		svg.attr('height', 500)
			.attr('width', 600);

		var arc = d3Service.svg.arc()
			.innerRadius(30)
			.outerRadius(80)
			.startAngle(0)
			.endAngle(2);

		var arc2 = d3Service.svg.arc()
			.innerRadius(30)
			.outerRadius(80)
			.startAngle(2)
			.endAngle(5);

		var arc3 = d3Service.svg.arc()
			.innerRadius(30)
			.outerRadius(80)
			.startAngle(5)
			.endAngle(6.29);

		var shape1 = svg.append("path")
			.attr("d", arc)
			.attr("transform", 'translate(200,255)')
			.attr("opacity", '.54')
			.attr("fill", '#01aaee')
			.style("stroke", '#ab0000')
			.style("stroke-width", '1');

		var shape2 = svg.append("path")
			.attr("d", arc2)
			.attr("transform", 'translate(200,255)')
			.attr("opacity", '.54')
			.attr("fill", '#bc2200')
			.style("stroke", '#0000cd')
			.style("stroke-width", '1');

		var shape3 = svg.append("path")
			.attr("d", arc3)
			.attr("transform", 'translate(200,255)')
			.attr("opacity", '.54')
			.attr("fill", '#44de00')
			.style("stroke", '#4545cd')
			.style("stroke-width", '1');


	};

	experimentalDraw();

}

angular.module('kbyteApp')
	.controller('ChartsController', ChartsController);

module.exports = ChartsController;
