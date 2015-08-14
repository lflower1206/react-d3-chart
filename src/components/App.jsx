'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    Route = Router.Route,
    AppRouter = require('./AppRouter');

Router.run(AppRouter, Router.HistoryLocation, function(Root){
    React.render(<Root />, document.getElementById('router'));
});

