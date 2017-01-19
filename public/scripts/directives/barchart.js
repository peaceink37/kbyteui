// Bar Chart directive

/* @ngInject */
function barChart(d3Service){

    function draw(svg, width, height, data) {

      svg
        .attr('width', width)
        .attr('height', height);

      // Define a margin
      var margin = 40;

      // Define x scale
      var xScale = d3.time.scale()
        .domain(d3.extent(data, function(d) { return d.x; }))
        .range([margin, width-margin]);

      // Define x-axis
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickFormat(d3.time.format('%H:%I'));

      // Define y-scale
      var yScale = d3.time.scale()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height-margin, margin]);

      // Define y-axis
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickFormat(d3.format('f'));

      // Draw the x-axis
      svg.select('.x-axis')
        .attr("transform", "translate(0, " + (height-margin) + ")")
        .call(xAxis);
      
      // Draw the y-axis
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

       /* ---- Draw bars ---- */

      //var barWidth = (width-2*margin)/data.length;
      var barWidth = 20;

      svg.select('.data')
        .selectAll('rect').data(data)
        .enter()
        .append('rect')
        .attr('class', 'data-bar');

      svg.select('.data')
        .selectAll('rect').data(data)
        .attr('r', 2.5)
        .attr('x', function(d) { return xScale(d.x) /*- barWidth*0.5;*/ })
        .attr('y', function(d) { return yScale(d.y); })
        .attr('width', function(d) { return barWidth; })
        .attr('height', function(d) { return yScale(0) - yScale(d.y); });

      svg.select('.data')
        .selectAll('rect').data(data)
        .exit()
        .remove();
    }

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      compile: function( element, attrs, transclude ) {

        // Create a SVG root element
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
        var width = 800, height = 300;

        // Return the link function
        return function(scope, element, attrs) {

          // Watch the data attribute of the scope
          scope.$watch('data', function(newVal, oldVal, scope) {
            
            // Update the chart
            if (scope.data) {
              draw(svg, width, height, scope.data);
            }
          }, true);
        };
      }
    };
}

angular.module('kbyteApp')
  .directive('barChart', barChart);

module.exports.barChart = barChart;

