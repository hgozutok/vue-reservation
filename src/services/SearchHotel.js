var axios = require("axios").default;

class SearchHotel {
  async search(searchQuery) {
    var results = null;

    await axios
      .get(process.env.VUE_APP_SEARCH_URL, {
        headers: {
          "x-rapidapi-host": process.env.VUE_APP_HOST_HEADER,
          "x-rapidapi-key": process.env.VUE_APP_HOST_HEADER_KEY,
        },
        params: {
          query: searchQuery,
          locale: "en_US",
          currency: "USD",
        },
      })
      .then((response) => {
        results = response.data;
        return results;
        //   console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    return results;
    // await axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }
  async getHotelImages(hotelId) {
    var results = null;

    await axios
      .get(process.env.VUE_APP_HOTEL_PHOTOS_URL, {
        headers: {
          "x-rapidapi-host": process.env.VUE_APP_HOST_HEADER,
          "x-rapidapi-key": process.env.VUE_APP_HOST_HEADER_KEY,
        },
        params: {
          id: hotelId,
        },
      })
      .then((response) => {
        // console.log("resd", response);
        results = response;
        return results;
        //   console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    return results;
  }
  async getPropertiesList(destinationId, checkIn, checkOut, adults1) {
    var results = null;

    await axios
      .get(process.env.VUE_APP_SEARCH_AS_LIST_URL, {
        headers: {
          "x-rapidapi-host": process.env.VUE_APP_HOST_HEADER,
          "x-rapidapi-key": process.env.VUE_APP_HOST_HEADER_KEY,
        },
        params: {
          destinationId: destinationId,
          pageNumber: "1",
          pageSize: "25",
          checkIn: checkIn,
          checkOut: checkOut,
          adults1: adults1,
          sortOrder: "PRICE",
          locale: "en_US",
          currency: "USD",
        },
      })
      .then((response) => {
        results = response.data;
        return results;
        //   console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    return results;
  }
}

export default new SearchHotel();
