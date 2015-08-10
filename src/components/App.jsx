'use strict';

var React = require('react/addons'),
    ArcChart = require('module/ArcChart');

var arcChartDIV = document.getElementById('arcChart');

if (arcChartDIV) {
    React.render(<ArcChart />, arcChartDIV);
}

