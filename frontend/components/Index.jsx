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
  render: function () {
    var properties,
        numResults = this.props.properties.length;

    if (typeof this.props.properties === "undefined") {
      properties = <p>No properties yet...</p>;
    } else {
      properties = (
        <div className="panel panel-default">
          <div className="panel-heading">
            <span className="panel-title">Available Properties  |  {numResults} results</span>
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
