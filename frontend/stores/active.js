var Store           = require('flux/utils').Store;
var AppDispatcher   = require('../dispatcher/dispatcher');
var ActiveConstants = require('../constants/active_constants');
var ActiveStore     = new Store(AppDispatcher);
var _activeProperty = -1;

var _resetActiveProperty  = function () { _activeProperty = -1; };
var _updateActiveProperty = function (property) { _activeProperty = property; };

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
      _updateActiveProperty(payload.property);
      ActiveStore.__emitChange();
      break;
  }
};

window.ActiveStore = ActiveStore;
module.exports = ActiveStore;
