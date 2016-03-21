var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');

var IndexItem = React.createClass({
  mixins: [ReactRouter.history],
  _fullAddress: function (property) {
    var propertyStreet = property.address;
    if (propertyStreet !== property.name && property.name !== "210 9th St. #E103") {
      propertyStreet = propertyStreet + " " + property.name;
    }
    var fullAddress = [propertyStreet, property.city, property.state + " " + property.zip];
    return fullAddress.join(", ");
  },
  getInitialState: function () {
    return{ activeImage: 0 };
  },
  componentDidUpdate: function() {
    if (this.refs.activeProperty) {
      var node = ReactDOM.findDOMNode(this.refs.activeProperty);
      node.scrollIntoView(node);
    }
  },
  render: function () {
    var propertyImages,
        activeProperty,
        propertyContainer,
        property = this.props.property,
        propertyAddress = this._fullAddress(property),
        bedBath = property.numberBedrooms  + " bed, " +
                  property.numberBathrooms + " bath",
        totalArea = property.totalArea + " sqft",
        targetRent = "$" + property.targetRent;

    if (this.props.expanded === this.props.idx) {
      activeProperty = "activeProperty";
      propertyContainer = { backgroundColor: '#f5f5f5' };
      propertyImages = (
        <div id={"detail-" + this.props.idx}>
          <div className="container">
            <div id="main_area">
              <div className="row">
                <div className="col-md-12" id="slider">
                  <div className="row">
                    <div className="col-md-6" id="carousel-bounding-box">
                      <div className="carousel slide" id="myCarousel">
                        <div className="carousel-inner">
                          {property.images.map(function (img, idx) {
                            var klass = "item";
                            if (idx === this.state.activeImage) {
                              klass = "active item";
                            }
                            return(
                              <div className={klass}
                                   data-slide-number={idx}
                                   key={"image-" + img.id}>
                                <img src={img.medium} key={img.id} />
                              </div>
                            );
                          }.bind(this))}
                          <a className="carousel-control left"
                             data-slide="prev"
                             href="#myCarousel">
                             <span className="glyphicon glyphicon-chevron-left"/>
                          </a>
                          <a className="carousel-control right"
                             data-slide="next"
                             href="#myCarousel">
                             <span className="glyphicon glyphicon-chevron-right"/>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <ul className="thumbnails">
                        {property.images.map(function (img, idx) {
                          return(
                            <li className="col-md-4" key={"image-" + idx}>
                              <a className="thumbnail"
                                 id={"carousel-selector-" + idx}
                                 data-slide-to={idx}
                                 href="#myCarousel">
                                <img src={img.thumb} key={"thumb-" + img.id} />
                              </a>
                            </li>
                          );
                        }.bind(this))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return(
      <div style={propertyContainer}>
        <div className="row toggle property-row"
             id={"dropdown-detail-" + this.props.idx}
             data-toggle={"detail-" + this.props.idx}>
          <div className="col-xs-10"
               ref={activeProperty}
               onClick={this.props.handleClick.bind(null, this.props.idx)}>
            <span className="address">{propertyAddress}</span><span>|</span>
            <span className="address-specs">{bedBath}</span><span>|</span>
            <span className="address-specs">{totalArea}</span><span>|</span>
            <span className="address-specs">{targetRent}</span>
            <span className="address-specs-expand">Click to view pics</span>
          </div>
        </div>
        {propertyImages}
        <br/>
      </div>
    );
  }
});

module.exports = IndexItem;
