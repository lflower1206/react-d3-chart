'use strick';

var React = require('react/addons'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var AppHandler = React.createClass({
    render: function() {
    
        return (
            <div>
                <ul>
                    <li>
                        <Link to="arcChart">Arc Chart</Link>
                    </li>
                    <li>
                        <Link to="areaChart">Area Chart</Link>
                    </li>
                    <li>
                        <Link to="barChart">Bar Chart</Link>
                    </li>
                    <li>
                        <Link to="rangebarChart">Range Bar Chart</Link>
                    </li>
                </ul>
                <div>
                    <RouteHandler />
                </div>
            </div>        
        );
    }
});

module.exports = AppHandler;

