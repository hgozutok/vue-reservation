var axios = require("axios").default;

var options = {
  method: "GET",
  url: process.env.VUE_APP_SEARCH_URL,
  params: { query: "new york", locale: "en_US", currency: "USD" },
  headers: {
    "x-rapidapi-host": process.env.VUE_APP_HOST_HEADER,
    "x-rapidapi-key": process.env.VUE_APP_HOST_HEADER_KEY,
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
