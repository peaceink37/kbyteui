/**
 * Created by kellysmith on 3/20/16.
 *
 * 2016 pokingBears.com
 */

/* @ngInject */
function scatterChart(d3Service){
	
	function draw(svg, width, height, data){

		svg
			.attr('width', width)
			.attr('height', height);

		var margin = 30;

		// Define x-scale
		var xScale = d3Service.time.scale()
			.domain(d3Service.extent(data, function(d){return d.x;}))
			.range([margin, width-margin]);

		// Define x-axis
		var xAxis = d3Service.svg.axis()
			.scale(xScale)
			.orient('bottom')
			.tickFormat(d3Service.time.format('%H:%I'));

		// Define y-scale
		var yScale = d3Service.time.scale()
			.domain([0, d3Service.max(data, function(d) { return d.y; })])
			.range([height-margin, margin]);

		// Define y-axis
		var yAxis = d3Service.svg.axis()
			.scale(yScale)
			.orient('left')
			.tickFormat(d3Service.format('f'));

		// Draw x-axis
		svg.select('.x-axis')
			.attr("transform", "translate(0, " + (height-margin) + ")")
			.call(xAxis);

		// Draw y-axis
		svg.select('.y-axis')
			.attr("transform", "translate(" + margin + ")")
			.call(yAxis);

		// Draw the x-grid
      	svg.select('.x-grid')
        	.attr("transform", "translate(0, " + margin + ")")
        	.call(xAxis
            .tickSize(height - 2*margin, 0, 0)
            .tickFormat("")
        );
      
      	// Draw the y-grid
      	svg.select('.y-grid')
        	.attr("transform", "translate(" + margin + ")")
        	.call(yAxis
            .tickSize(-width + 2*margin, 0, 0)
            .tickFormat("")
        );

		// Add new the data points
		svg.select('.data')
			.selectAll('circle').data(data)
			.enter()
			.append('circle')
			.attr('class', 'data-point');

		// Updated all data points
		svg.select('.data')
			.selectAll('circle').data(data)
			.attr('r', 6.5)
			.attr('cx', function(d) { return xScale(d.x); })
			.attr('cy', function(d) { return yScale(d.y); });

		svg.select('.data')
			.selectAll('circle').data(data)
			.exit()
			.remove();

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

		svg.select('.data-area')
			.datum(data)
			.attr('d', area);
	}

	function compileChart(element, attrs, transclude){

		console.log(' compile called '+element);

		var svg = d3.select(element[0]).append('svg');

        /* Create container */
        var axis_container = svg.append('g').attr('class', 'axis');
        var data_container = svg.append('g').attr('class', 'data');

        axis_container.append('g').attr('class', 'x-grid grid');
        axis_container.append('g').attr('class', 'y-grid grid');
        
        axis_container.append('g').attr('class', 'x-axis axis');
        axis_container.append('g').attr('class', 'y-axis axis');
        
        data_container.append('path').attr('class', 'data-line');
        data_container.append('path').attr('class', 'data-area');

			// Define the dimensions for the chart
			var width = 3200
			var height = 600;

			// linking function
			return function(scope, element, attrs){

				console.log(' scope in scatter chart'+scope);
				scope.$watch('data',function(newVal, oldVal, scope){

					if(typeof scope.data === 'undefined'){
						return;
					}

					draw(svg, width, height, scope.data);
				}, true)
			};

	}


	return {
		restrict:"E",
		scope:{
			data:'='
		},
		compile: compileChart
	};

}

angular.module('kbyteApp')
	.directive('scatterChart', scatterChart)

module.exports = scatterChart;
