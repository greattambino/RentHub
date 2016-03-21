var Store           = require('flux/utils').Store;
var AppDispatcher   = require('../dispatcher/dispatcher');
var ActiveConstants = require('../constants/active_constants');
var ActiveStore     = new Store(AppDispatcher);
var _activeProperty = -1;
var _activeLocation = "All";

var _resetActiveProperty  = function () { _activeProperty = -1; };
var _updateActiveLocation = function (location) { _activeLocation = location; };
var _updateActiveProperty = function (property) { _activeProperty = property; };

ActiveStore.activeLocation = function () {
  return _activeLocation;
};
ActiveStore.activeProperty = function () {
  return _activeProperty;
};
ActiveStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PropertyConstants.PROPERTIES_RECEIVED:
      _resetActiveProperty();
      ActiveStore.__emitChange();
      break;
    case ActiveConstants.PROPERTY_RECEIVED:
      _updateActiveProperty(payload.property, payload.location);
      ActiveStore.__emitChange();
      break;
    case ActiveConstants.LOCATION_RECEIVED:
      _updateActiveLocation(payload.location);
      _activeProperty = -1;
      ActiveStore.__emitChange();
      break;
  }
};

window.ActiveStore = ActiveStore;
module.exports = ActiveStore;
