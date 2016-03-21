var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');
var IndexRoute  = ReactRouter.IndexRoute;
var Router      = ReactRouter.Router;
var Route       = ReactRouter.Route;
var root        = document.getElementById('content');
var logo = "http://res.cloudinary.com/yumblr/image/upload/v1458475250/rentHub_q1hvut.jpg";

var App = React.createClass({
  render: function () {
    return(
      <div>
        <img className="logo" src={logo} />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>

  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, root);
