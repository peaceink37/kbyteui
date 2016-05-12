/**
 * Created by kellysmith on 3/20/16.
 *
 * 2016 pokingBears.com
 */

function scatterChart(d3Service){
	

	function draw(svg, width, height, data){

		svg.attr('width', width)
			.attr('height', height);

		var margin = 40;

		// Define x-scale
		var xScale = d3Service.time.scale()
			.domain(d3Service.extent(data, function(d){return d.x;}))
			.range([margin, width-margin]);

		// Define x-axis
		var xAxis = d3Service.svg.axis()
			.scale(xScale)
			.orient('top')
			.tickFormat(d3Service.time.format('%H:%I'));

		// Define y-scale
		var yScale = d3Service.time.scale()
			.domain([0, d3Service.max(data, function(d) { return d.y; })])
			.range([margin, height-margin]);

		// Define y-axis
		var yAxis = d3Service.svg.axis()
			.scale(yScale)
			.orient('left')
			.tickFormat(d3Service.format('f'));

		// Draw x-axis
		svg.select('.x-axis')
			.attr("transform", "translate(0, " + margin + ")")
			.call(xAxis);

		// Draw y-axis
		svg.select('.y-axis')
			.attr("transform", "translate(" + margin + ")")
			.call(yAxis);

		function key(d,i){
			return d.x + '#' + d.y;
		}

		// Add new the data points
		svg.select('.data')
			.selectAll('circle').data(data)
			.enter()
			.append('circle')
			.attr('class', 'data-point');

		// Updated all data points
		svg.select('.data')
			.selectAll('circle').data(data)
			.attr('r', 2.5)
			.attr('cx', function(d) { return xScale(d.x); })
			.attr('cy', function(d) { return yScale(d.y); });

		var line = d3Service.svg.line()
			.x(function(d) { return xScale(d.x); })
			.y(function(d) { return yScale(d.y); })
			.interpolate('cardinal');

		svg.select('.data-line')
			.datum(data)
			.attr('d', line);

		var area = d3Service.svg.area()
			.x(function(d) { return xScale(d.x); })
			.y0(yScale(0))
			.y1(function(d) { return yScale(d.y); })
			.interpolate('cardinal');

		svg.select('.data-visual')
			.datum(data)
			.attr('d', area);
	}


	return {

		restrict:"E",
		scope:{
			data:'='
		},
		compile: function(element, attrs, transclude){

			var svg = d3Service.select(element[0]).append('svg');

			svg.append('g').attr('class', 'data');
			svg.append('g').attr('class', 'x-axis axis');
			svg.append('g').attr('class', 'y-axis axis');

			svg.append('path').attr('class', 'data-line');
			svg.append('path').attr('class', 'data-area');

			// Define the dimensions for the chart
			var width = 600
			var height = 300;

			// return the link function
			return function(scope, element, attrs, $ctrl){
				console.log(' scope '+scope);
				scope.$watch('data',function(newVal, oldVal, scope){

					if(typeof scope.data === 'undefined'){
						return;
					}

					draw(svg, width, height, scope.data);
				}, true)

			}
		}
	};

}

angular.module('kbyteApp')
	.directive('scatterChart', scatterChart)

module.exports = scatterChart;
