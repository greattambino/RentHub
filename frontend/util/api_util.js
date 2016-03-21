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
  },
  fetchProperties: function (keyword) {
    $.ajax({
      url: "http://www.onerent.co/api/Property/availableProperties",
      type: "POST",
      dataType: 'json',
      success: function (response) {
        var results = [];
        outer:
        for (var i in response) {
          inner:
          for (var j in response[i].images){
            if (response[i].images[j].labels[keyword]) {
              results.push(response[i]);
              break inner;
            }
          }
        }
        ApiActions.receiveProperties(results);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
};

module.exports = ApiUtil;
