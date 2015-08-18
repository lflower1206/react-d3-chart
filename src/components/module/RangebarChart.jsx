'use strick';

var React = require('react/addons'),
    d3 = require('d3');

var RangeBarChart = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        height: React.PropTypes.number,
        width: React.PropTypes.number
    },
    _calculate: function() {

        var drawableHeight = this.props.height - this.state.margin.top - this.state.margin.bottom,
            drawableWidth = this.props.width - this.state.margin.left - this.state.margin.right;

        var xScale =d3.scale.ordinal()
                            .domain(d3.range(24))
                            .rangeRoundBands([0, drawableWidth], 0.2);

        var yScale = d3.scale.linear()
                             .domain([0, 180])
                             .range([drawableHeight, 0]);


        this.setState({
            xScale: xScale,
            yScale: yScale,
            drawableHeight: drawableHeight,
            drawableWidth: drawableWidth
        });

    },
    _draw: function() {
        var that = this,
            xScale = this.state.xScale,
            yScale = this.state.yScale,
            drawableHeight = this.state.drawableHeight;

        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient('bottom');

        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient('left');
        
        var svg = d3.select(React.findDOMNode(this.refs.svg))
                    .attr('width', this.props.width)
                    .attr('height', this.props.height);

        var axis = svg.append('g')
                      .attr('transform', 'translate(' + this.state.margin.left + ', ' + this.state.margin.bottom + ')');

        axis.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + this.state.drawableHeight + ')')
            .call(xAxis);

        axis.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        var bars = axis.selectAll('.range')
                       .data(this.props.data)
                       .enter()
                       .append('rect')
                       .attr('class', 'range')
                       .attr('x', function(d) {return xScale(d.hour);})
                       .attr('y', function(d) {
                           var max = yScale(d.range.max),
                               min = yScale(d.range.min);
                           
                           // calculate middle point
                           return max + (min - max) / 2;
                       })
                       .attr('width', xScale.rangeBand())
                       .attr('height', 0);
                       
        bars.transition()
            .duration(1000)
            .attr('y', function(d) {
                return yScale(d.range.max);
            })
            .attr('height', function(d) {
                return yScale(d.range.min) - yScale(d.range.max);
            })
            .attr('rx', xScale.rangeBand() / 2)
            .attr('ry', xScale.rangeBand() / 2);
    },
    getDefaultProps: function() {
        return {
            width: 320,
            height: 320,
            data: [
                {hour: 0, range: {min: 70, max: 112}},
                {hour: 1, range: {min: 75, max: 99}},
                {hour: 2, range: {min: 72, max: 99}},
                {hour: 3, range: {min: 60, max: 87}},
                {hour: 4, range: {min: 65, max: 76}},
                {hour: 5, range: {min: 70, max: 78}},
                {hour: 6, range: {min: 71, max: 75}},
                {hour: 7, range: {min: 69, max: 77}},
                {hour: 8, range: {min: 65, max: 76}},
                {hour: 9, range: {min: 64, max: 80}},
                {hour: 10, range: {min: 72, max: 80}},
                {hour: 11, range: {min: 75, max: 77}},
                {hour: 12, range: {min: 75, max: 81}},
                {hour: 13, range: {min: 68, max: 72}},
                {hour: 14, range: {min: 66, max: 75}},
                {hour: 15, range: {min: 61, max: 69}},
                {hour: 16, range: {min: 70, max: 89}},
                {hour: 17, range: {min: 65, max: 110}},
                {hour: 18, range: {min: 80, max: 90}},
                {hour: 19, range: {min: 81, max: 92}},
                {hour: 20, range: {min: 79, max: 99}},
                {hour: 21, range: {min: 78, max: 102}},
                {hour: 22, range: {min: 67, max: 95}},
                {hour: 23, range: {min: 78, max: 96}},
            ]
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

module.exports = RangeBarChart;

