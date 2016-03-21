var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PropertyConstants = require('../constants/property_constants');
var PropertyStore = new Store(AppDispatcher);
var _properties = [];

var _resetProperties = function (properties) {
  _properties = properties.slice(0);
};

PropertyStore.all = function () {
  return _properties.slice(0);
};

PropertyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PropertyConstants.PROPERTIES_RECEIVED:
      _resetProperties(payload.properties);
      PropertyStore.__emitChange();
      break;
  }
};

window.PropertyStore = PropertyStore;
module.exports = PropertyStore;
