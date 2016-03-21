var React       = require('react');
var IndexItem   = require('./IndexItem');

var Index = React.createClass({
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
                    idx={idx}/>
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
