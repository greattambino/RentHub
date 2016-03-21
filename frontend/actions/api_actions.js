var PropertyConstants = require('../constants/property_constants');
var AppDispatcher     = require('../dispatcher/dispatcher');
var ActiveConstants   = require('../constants/active_constants');

ApiActions = {
  receiveProperties: function (properties) {
    AppDispatcher.dispatch({
      actionType: PropertyConstants.PROPERTIES_RECEIVED,
      properties: properties
    });
  },
  updateActiveProperty: function (property) {
    AppDispatcher.dispatch({
      actionType: ActiveConstants.PROPERTY_RECEIVED,
      property: property
    });
  },
  updateActiveLocation: function (location) {
    AppDispatcher.dispatch({
      actionType: ActiveConstants.LOCATION_RECEIVED,
      location: location
    });
  }
};

module.exports = ApiActions;
