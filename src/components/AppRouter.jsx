'use strick';

var React = require('react/addons'),
    Router = require('react-router'),
    Route = Router.Route;

var AppHandler = require('./AppHandler'),
    ArcChart = require('module/ArcChart'),
    AreaChart = require('module/AreaChart'),
    BarChart = require('module/BarChart'),
    RangebarChart = require('module/RangebarChart');

var appRouter = (
    <Route path="/" name="app" handler={AppHandler}>
        <Route path="/ArcChart" name="arcChart" handler={ArcChart} />
        <Route path="/AreaChart" name="areaChart" handler={AreaChart} />
        <Route path="/BarChart" name="barChart" handler={BarChart} />
        <Route path="/RangebarChart" name="rangebarChart" handler={RangebarChart} />
    </Route>
);

module.exports = appRouter;

