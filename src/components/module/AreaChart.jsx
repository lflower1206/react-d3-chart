'use strict';

var React = require('react/addons'),
    d3 = require('d3');

var AreaChart = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        height: React.PropTypes.number,
        width: React.PropTypes.number
    },
    _areaTween: function(newData, cb) {
        return function(d, i, a) {
        
            var interpolate = d3.interpolateArray(d, newData);
            
            return function(t) {
                return cb(interpolate(t));
            };
        };
    },
    _calculate: function() {
        var drawableHeight = this.props.height - this.state.margin.top - this.state.margin.bottom,
            drawableWidth = this.props.width - this.state.margin.left - this.state.margin.right;

        var xScale = d3.scale.ordinal()
                             .domain(d3.range(24))
                             .rangeBands([0, drawableWidth]);

        var yScale = d3.scale.linear()
                             .domain([0, 300])
                             .range([drawableHeight, 0]);
        
        this.setState({
            xScale: xScale,
            yScale: yScale,
            drawableHeight: drawableHeight,
            drawableWidth: drawableWidth
        });
    },
    _draw: function() {
        var xScale = this.state.xScale,
            yScale = this.state.yScale,
            drawableHeight = this.state.drawableHeight,
            tempData = this.props.data.map(function(d) {
                return {hour: d.hour, calories: 0};
            });

        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient('bottom');

        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient('left');
        
        var svg = d3.select(React.findDOMNode(this.refs.svg))
                    .attr('width', this.props.width)
                    .attr('height', this.props.height);
        
        var area = d3.svg.area()
                         .x(function(d) {
                             return xScale(d.hour);
                         })
                         .y0(drawableHeight)
                         .y1(function(d) {
                             return yScale(d.calories);
                         });


        var axis = svg.append('g')
                      .attr('transform', 'translate(' + this.state.margin.left + ', ' + this.state.margin.top + ')');

        axis.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + this.state.drawableHeight + ')')
            .call(xAxis);

        axis.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        axis.append('path')
            .datum(tempData)
            .attr('class', 'area')
            .attr('d', area)
            .transition()
                .duration(1000)
                .attrTween('d', this._areaTween(this.props.data, area));
    },
    getDefaultProps: function() {
        return {
            data: [
                {hour: '0', calories: 201},
                {hour: '1', calories: 154},
                {hour: '2', calories: 178},
                {hour: '3', calories: 50},
                {hour: '4', calories: 68},
                {hour: '5', calories: 97},
                {hour: '6', calories: 104},
                {hour: '7', calories: 111},
                {hour: '8', calories: 198},
                {hour: '9', calories: 55},
                {hour: '10', calories: 76},
                {hour: '11', calories: 41},
                {hour: '12', calories: 98},
                {hour: '13', calories: 174},
                {hour: '14', calories: 163},
                {hour: '15', calories: 85},
                {hour: '16', calories: 91},
                {hour: '17', calories: 50},
                {hour: '18', calories: 179},
                {hour: '19', calories: 181},
                {hour: '20', calories: 154},
                {hour: '21', calories: 78},
                {hour: '22', calories: 81},
                {hour: '23', calories: 56}
            ],
            height: 320,
            width: 320
        };
    },
    getInitialState: function() {
        return {
            margin: {top: 20, right: 0, bottom: 20, left: 30}
        };
    },
    componentWillMount: function() {
        this._calculate();
    },
    componentDidMount: function() {
        this._draw();
    },
    render: function() {
        return (
            <svg ref="svg"></svg>        
        );
    }
});

module.exports = AreaChart;

