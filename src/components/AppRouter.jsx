'use strick';

var React = require('react/addons'),
    Router = require('react-router'),
    Route = Router.Route;

var AppHandler = require('./AppHandler'),
    ArcChart = require('module/ArcChart'),
    BarChart = require('module/BarChart');

var appRouter = (
    <Route path="/" name="app" handler={AppHandler}>
        <Route path="/ArcChart" name="arcChart" handler={ArcChart} />
        <Route path="/BarChart" name="barChart" handler={BarChart} />
    </Route>
);

module.exports = appRouter;

