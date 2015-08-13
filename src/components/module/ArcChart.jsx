'use strict';

var React = require('react/addons'),
    d3 = require('d3');

var τ = 2 * Math.PI;

var ArcChart = React.createClass({
    _arcTween: function(d) {

        var that = this,
            endAngle = Math.min(360 * this.state.ratio, 360) * (Math.PI / 180),
            interpolate = d3.interpolate(d.endAngle, endAngle);
        
        return function(t) {
            d.endAngle = interpolate(t);
            
            return that.state.foregroundArc(d);
        };
    },
    _labelTween: function(d) {
        var that = this,
            interpolate = d3.interpolate(d.ratio, this.state.ratio);

        return function(t) {

            d.ratio = interpolate(t);

            this.textContent = Math.round(d.ratio * 100) + '%';
        };
    },
    _calculate: function() {

        var ratio = (this.props.value - this.props.minValue) / (this.props.maxValue - this.props.minValue);
        
        this.setState({
            ratio: ratio
        });
        
        return ratio;
    },
    _repaint: function() {
        var that = this,
            svg = d3.select(React.findDOMNode(this.refs.svg))
                    .attr('width', this.props.width)
                    .attr('height', this.props.height),
            arcs = svg.append('g').attr('class', 'arcs'),
            labels = svg.append('g').attr('class', 'labels'),
            label = labels.append('text');

        arcs.append('path')
                .datum({endAngle: τ})
                .attr('class', 'background-arc')
                .attr('transform', 'translate(' + this.props.width / 2 + ',' + this.props.width / 2 + ')')
                .attr('d', this.state.backgroundArc);

        var foreground = arcs.append('path')
                .datum({endAngle: 0.1})
                .attr('class', 'foreground-arc')
                .attr('transform', 'translate(' + this.props.width / 2 + ',' + this.props.width / 2 + ')')
                .attr('d', this.state.foregroundArc);

        label.datum({ratio: 0})
                .attr('class', 'label')
                .attr('y', this.props.width / 2 + this.props.fontSize / 3)
                .attr('x', this.props.width / 3)
                .attr('width', this.props.width)
                .text(function (d) { 
                    return Math.round(d.ratio * 100) + '%';
                })
                .style('font-size', this.props.fontSize + 'px');

        foreground.transition()
                    .duration(1000)
                    .attrTween('d', this._arcTween);

        label.transition()
                    .duration(1000)
                    .tween('text', this._labelTween);
    },
    getDefaultProps: function() {
        return {
            width: 300,
            height: 300,
            minValue: 0,
            maxValue: 100,
            value: 70,
            fontSize: 48
        };
    },
    getInitialState: function() {
        var backgroundArc = d3.svg.arc()
                                .startAngle(0)
                                .outerRadius(this.props.width / 2 - 5)
                                .innerRadius(this.props.width / 2 - 10);

        var foregroundArc = d3.svg.arc()
                                .startAngle(0)
                                .outerRadius(this.props.width / 2)
                                .innerRadius(this.props.width / 2 - 15)
                                .cornerRadius(12);

        return {
            backgroundArc: backgroundArc,
            foregroundArc: foregroundArc,
            ratio: 0
        };
    },
    componentWillMount: function() { 
        this._calculate();
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

module.exports = ArcChart;
