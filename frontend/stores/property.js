var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PropertyConstants = require('../constants/property_constants');
var PropertyStore = new Store(AppDispatcher);
var _properties = [];
var _CAProperties = [];
var _WAProperties = [];

var _resetProperties = function (properties) {
  _properties = properties.slice(0);
};
var _updateLocations = function () {
  var californiaProperties = [];
  var washingtonProperties = [];
  _properties.map(function (property) {
    if (property.state === "CA") {
      californiaProperties.push(property);
    } else {
      washingtonProperties.push(property);
    }
  });
  _CAProperties = californiaProperties;
  _WAProperties = washingtonProperties;
};

PropertyStore.all = function () {
  return _properties.slice(0);
};
PropertyStore.washington = function () {
  return _WAProperties.slice(0);
};
PropertyStore.california = function () {
  return _CAProperties.slice(0);
};
PropertyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PropertyConstants.PROPERTIES_RECEIVED:
      _resetProperties(payload.properties);
      _updateLocations();
      PropertyStore.__emitChange();
      break;
  }
};

window.PropertyStore = PropertyStore;
module.exports = PropertyStore;
