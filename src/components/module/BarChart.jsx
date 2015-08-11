'use strict';

var React = require('react/addons'),
    d3 = require('d3');

var BarChart = React.createClass({
    _repaint: function() {

	var barChartHeight = this.props.height - this.state.margin.top - this.state.margin.bottom,
            barChartWidth = this.props.width - this.state.margin.left - this.state.margin.right;

        var xScale = d3.scale.ordinal()
                            .domain(d3.range(24))
                            .rangeRoundBands([0, barChartWidth], 0.2);

        var yScale = d3.scale.linear()
                            .domain([0, 10000])
                            .range([barChartHeight, 0]);

        var xAxis = d3.svg.axis()
                   .scale(xScale)
                   .orient('bottom');

        var yAxis = d3.svg.axis()
                   .scale(yScale)
                   .orient('left')
                   .tickFormat(d3.format('s'));


        var dataset = this.props.data;


        var that = this,
            svg = d3.select(React.findDOMNode(this.refs.svg))
                    .attr('width', this.props.width)
                    .attr('height', this.props.height);

        var axis = svg.append('g')
                      .attr('transform', 'translate(' + this.state.margin.left + ', ' + this.state.margin.bottom + ')');
        

        axis.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + barChartHeight + ')')
            .call(xAxis);

        axis.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        axis.selectAll(".bar")
                .data(dataset)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                    return xScale(d.hour);
                })
                .attr("y", function(d) {
                    return yScale(d.step);
                })
                .attr('rx', xScale.rangeBand() / 2)
                .attr('ry', 0)
                .attr("width", xScale.rangeBand())
                .attr("height", function(d) {
                    return barChartHeight - yScale(d.step); 
                });
    },
    getDefaultProps: function() {
        return {
            width: 320,
            height: 320,
            data: [
                {hour: 0, step: 2215},
                {hour: 1, step: 5542},
                {hour: 2, step: 453},
                {hour: 3, step: 111},
                {hour: 4, step: 57},
                {hour: 5, step: 8555},
                {hour: 6, step: 357},
                {hour: 7, step: 786},
                {hour: 8, step: 548},
                {hour: 9, step: 12},
                {hour: 10, step: 757},
                {hour: 11, step: 2787},
                {hour: 12, step: 83},
                {hour: 13, step: 0},
                {hour: 14, step: 857},
                {hour: 15, step: 213},
                {hour: 16, step: 786},
                {hour: 17, step: 354},
                {hour: 18, step: 11},
                {hour: 19, step: 8689},
                {hour: 20, step: 5237},
                {hour: 21, step: 3543},
                {hour: 22, step: 4862},
                {hour: 23, step: 107}
            ]
        };
    },
    getInitialState: function() {
        return {
	    margin: {top: 20, right: 0, bottom: 20, left: 25},
        };
    },
    componentDidMount: function() {
        this._repaint();
    },
    render: function() {
        return (
            <svg ref="svg"></svg>
        );
    }
});

module.exports = BarChart;
