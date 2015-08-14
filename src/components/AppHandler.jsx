'use strick';

var React = require('react/addons'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var AppHandler = React.createClass({
    render: function() {
    
        return (
            <div>
                <Link to="arcChart">Arc Chart</Link>
                <Link to="barChart">Bar CHart</Link>
                <div>
                    <RouteHandler />
                </div>
            </div>        
        );
    }
});

module.exports = AppHandler;

