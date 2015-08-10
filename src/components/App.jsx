'use strict';

var React = require('react/addons'),
    ArcChart = require('module/ArcChart'),
    BarChart = require('module/BarChart');

var arcChartDIV = document.getElementById('arcChart'),
    barChartDIV = document.getElementById('barChart');

if (arcChartDIV) {
    React.render(<ArcChart minValue="0" maxValue="100" value="10" />, arcChartDIV);
}

if (barChartDIV) {
    React.render(<BarChart />, barChartDIV);
}
