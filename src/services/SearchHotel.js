var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/locations/v2/search",
  params: { query: "new york", locale: "en_US", currency: "USD" },
  headers: {
    "x-rapidapi-host": "hotels4.p.rapidapi.com",
    "x-rapidapi-key": "e13027cccdmshb792f813a512a15p19ce40jsnf802d29ef038",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
