var ApiActions = require('../actions/api_actions');

ApiUtil = {
  fetchAllProperties: function () {
    $.ajax({
      url: "http://www.onerent.co/api/Property/availableProperties",
      type: "POST",
      dataType: 'json',
      success: function (res) {
        ApiActions.receiveProperties(res);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
};

module.exports = ApiUtil;
