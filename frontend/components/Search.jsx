var React = require('react');
var PropertyStore = require('../stores/property');
var ActiveStore   = require('../stores/active');
var ApiUtil       = require('../util/api_util');
var Index         = require('./Index');

var _getActiveLocation = function () {
  return ActiveStore.activeLocation();
};
var _getAllProperties = function () {
  return PropertyStore.all();
};
var _getCAProperties = function () {
  return PropertyStore.california();
};
var _getWAProperties = function () {
  return PropertyStore.washington();
};

var Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  _onLocationChange: function (location, e) {
    if (this.state.selectedLocation !== location) {
      ApiActions.updateActiveLocation(location);
      if (location === "WA") {
        this.setState({ properties: _getWAProperties() });
      } else if (location === "CA") {
        this.setState({ properties: _getCAProperties() });
      } else {
        this.setState({ properties: _getAllProperties() });
      }
    }
  },
  _propertiesChanged: function () {
    this.setState({ properties: _getAllProperties() });
  },
  _selectionsChanged: function () {
    this.setState({ selectedLocation: _getActiveLocation() });
  },
  getInitialState: function () {
    return { properties: _getAllProperties(), selectedLocation: "All" };
  },
  componentDidMount: function () {
    this.propertyListener = PropertyStore.addListener(this._propertiesChanged);
    this.activeListener = ActiveStore.addListener(this._selectionsChanged);
    ApiUtil.fetchAllProperties();
  },
  componentWillUnmount: function () {
    this.propertyListener.remove();
    this.activeListener.remove();
  },
  render: function () {
    return(
      <div>
        <Index
          properties={this.state.properties}
          history={this.props.history}
          selectedLocation={this.state.selectedLocation}
          handleLocationChange={this._onLocationChange}/>
      </div>
    );
  }
});

module.exports = Search;
