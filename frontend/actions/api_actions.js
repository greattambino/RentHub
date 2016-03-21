var PropertyConstants = require('../constants/property_constants');
var AppDispatcher     = require('../dispatcher/dispatcher');

ApiActions = {
  receiveProperties: function (properties) {
    AppDispatcher.dispatch({
      actionType: PropertyConstants.PROPERTIES_RECEIVED,
      properties: properties
    });
  }
};

module.exports = ApiActions;
