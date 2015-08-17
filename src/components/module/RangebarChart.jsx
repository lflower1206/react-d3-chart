'use strick';

var React = require('react/addons'),
    d3 = require('d3');

var RangeBarChart = React.createClass({
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
                           return yScale(d.range.max);
                       })
                       .attr('width', xScale.rangeBand())
                       .attr('height', function(d) {
                           return drawableHeight - yScale(d.range.min);
                       })
                       .attr('rx', xScale.rangeBand() / 2)
                       .attr('ry', xScale.rangeBand() / 2);

                       
                       /* bars.transition()
                           .duration(1000)
                           .attr('y', function(d) {
                               return drawableHeight - yScale(d.range.max);
                           })
                           .attr('height', function(d) {
                               return drawableHeight - yScale(d.range.min);
                           }); */ 
    },
    getDefaultProps: function() {
        return {
            width: 320,
            height: 320,
            data: [
                {hour: 0, range: {min: 55, max: 112}},
                {hour: 1, range: {min: 63, max: 105}}
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

