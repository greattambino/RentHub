var React       = require('react');
var IndexItem   = require('./IndexItem');
var ActiveStore = require('../stores/active');

var _getActiveProperty = function () {
  return ActiveStore.activeProperty();
};

var Index = React.createClass({
  _activePropertyChanged: function () {
    this.setState({ expanded: _getActiveProperty() });
  },
  getInitialState: function () {
    return{ expanded: _getActiveProperty() };
  },
  componentDidMount: function () {
    this.activeListener = ActiveStore.addListener(this._activePropertyChanged);
  },
  componentWillUnmount: function () {
    this.activeListener.remove();
  },
  toggleImages: function (idx, location, e) {
    if (this.state.expanded === idx) {
      ApiActions.updateActiveProperty(-1);
    } else {
      ApiActions.updateActiveProperty(idx, location);
    }
  },
  // handleLocationChange: function (location, e) {
  //   if (this.state.selectedLocation !== location) {
  //     if (location === "All") {
  //       ApiUtil.fetchAllProperties();
  //     } else {
  //       ApiActions.updateLocation(location);
  //     }
  //   }
  // },
  render: function () {
    var properties,
        activeLocationWA,
        activeLocationCA,
        activeLocationAll,
        numResults = this.props.properties.length,
        selectedLocation = this.props.selectedLocation;

    if (typeof this.props.properties === "undefined") {
      properties = <p>No properties yet...</p>;
    } else {
      if (selectedLocation === "WA") {
        activeLocationWA = "active-location-tab";
        activeLocationCA = "location-tab";
        activeLocationAll = "location-tab";
      } else if (selectedLocation === "CA") {
        activeLocationWA = "location-tab";
        activeLocationCA = "active-location-tab";
        activeLocationAll = "location-tab";
      } else {
        activeLocationWA = "location-tab";
        activeLocationCA = "location-tab";
        activeLocationAll = "active-location-tab";
      }
      properties = (
        <div className="panel panel-default">
          <div className="panel-heading">
            <span className="panel-title">Available Properties  |  {numResults} results</span>
            <span className={"location-filter " + activeLocationWA}
                  onClick={this.props.handleLocationChange.bind(null, "WA")}>WA </span>
            <span className={"location-filter " + activeLocationCA}
                  onClick={this.props.handleLocationChange.bind(null, "CA")}>CA  |</span>
            <span className={"location-filter " + activeLocationAll}
                  onClick={this.props.handleLocationChange.bind(null, "All")}>All  |</span>
          </div>
          <ul className="list-group">
            {this.props.properties.map(function (property, idx) {
              return (
                <li className="list-group-item" key={idx}>
                  <IndexItem
                    property={property}
                    idx={idx}
                    handleClick={this.toggleImages.bind(null, idx)}
                    expanded={this.state.expanded}/>
                </li>
              );
            }.bind(this))}
          </ul>
      	</div>
      );
    }
    return(<div>{properties}</div>);
  }
});

module.exports = Index;
