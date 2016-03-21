var React = require('react');

var SearchBox = React.createClass({
  getInitialState: function () {
    return { searchString: "" };
  },
  handleChange: function (e) {
    this.setState({ searchString: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.searchString === "") {
      ApiUtil.fetchAllProperties();
    } else {
      ApiUtil.fetchProperties(this.state.searchString);
    }
    ApiActions.updateActiveLocation("All");
  },
  render: function () {
    return(
      <div className="container">
      	<div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div id="search-box">
              <div className="input-group col-md-12">
                <form role="search"
                      className="search-form"
                      onSubmit={this.handleSubmit}>
                  <span className="input-group-addon" id="search-form-glyph">
                    <i className="glyphicon glyphicon-filter"></i>
                  </span>
                  <input type="text"
                         className="form-control input-lg"
                         placeholder="It must have...     (i.e. hardwood, balcony, backyard, etc.)"
                         onChange={this.handleChange}
                         onSubmit={this.handleSubmit} />
                </form>
              </div>
            </div>
          </div>
      	</div>
      </div>
    );
  }
});

module.exports = SearchBox;
