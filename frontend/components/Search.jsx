var React = require('react');
var PropertyStore = require('../stores/property');
var ApiUtil       = require('../util/api_util');
var Index         = require('./Index');

var _getAllProperties = function () {
  return PropertyStore.all();
};

var Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  _propertiesChanged: function () {
    this.setState({ properties: _getAllProperties() });
  },
  getInitialState: function () {
    return { properties: _getAllProperties() };
  },
  componentDidMount: function () {
    this.propertyListener = PropertyStore.addListener(this._propertiesChanged);
    ApiUtil.fetchAllProperties();
  },
  componentWillUnmount: function () {
    this.propertyListener.remove();
  },
  render: function () {
    return(
      <div>
        <Index
          properties={this.state.properties}
          history={this.props.history} />
      </div>
    );
  }
});

module.exports = Search;
